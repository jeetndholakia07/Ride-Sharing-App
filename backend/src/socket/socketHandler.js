import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

// Track online users
const onlineUsers = new Map();

const socketHandler = (io) => {
  // ---- AUTHENTICATION ----
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) throw new Error("Missing token");

      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = payload.id;
      next();
    } catch (err) {
      console.error("Socket authentication failed:", err.message);
      next(new Error("Authentication error"));
    }
  });

  // ---- CONNECTION ----
  io.on("connection", async (socket) => {
    const userId = socket.userId;
    console.log(`User connected: ${userId}, socketId: ${socket.id}`);

    // Track socket
    if (!onlineUsers.has(userId)) onlineUsers.set(userId, new Set());
    onlineUsers.get(userId).add(socket.id);

    // Join personal room for this user
    socket.join(userId);

    // If first socket for this user -> broadcast online
    if (onlineUsers.get(userId).size === 1) {
      await broadcastOnlineStatus(io, userId, true);
    }

    // ---- JOIN ROOM ----
    socket.on("joinRoom", async ({ roomId }) => {
      try {
        const senderId = socket.userId;

        socket.join(roomId);
        console.log(`User ${senderId} joined room ${roomId}`);

        // ---- Notify everyone in the room that this user joined ----
        socket.to(roomId).emit("roomJoined", { userId: senderId });

        // ---- Send the online status of all users already in the room to this user ----
        const socketsInRoom = await io.in(roomId).fetchSockets();
        const existingUsers = new Set();
        socketsInRoom.forEach((s) => {
          if (s.userId !== senderId && !existingUsers.has(s.userId)) {
            existingUsers.add(s.userId);
            socket.emit("onlineStatus", { userId: s.userId, isOnline: true });
          }
        });

        // ---- Also broadcast that this user is online to everyone in the room ----
        socket.to(roomId).emit("onlineStatus", { userId: senderId, isOnline: true });
      } catch (err) {
        console.error("Error joining room:", err);
        socket.emit("error", "Unable to join room");
      }
    });

    // ---- SEND MESSAGE ----
    socket.on("sendMessage", async ({ roomId, content, tempId }) => {
      try {
        const senderId = socket.userId;
        const chat = await Chat.findOne({ roomId });
        if (!chat) return socket.emit("error", "Chat not found");

        const newMessage = {
          tempId: tempId,
          content,
          senderId,
          isRead: false,
          createdAt: new Date()
        };

        let savedMessage;
        let messageDoc = await Message.findOne({ chat: chat._id });
        if (messageDoc) {
          messageDoc.messages.push(newMessage);
          savedMessage = messageDoc.messages[messageDoc.messages.length - 1];
          await messageDoc.save();
        } else {
          messageDoc = await Message.create({ chat: chat._id, messages: [newMessage] });
          savedMessage = messageDoc.messages[messageDoc.messages.length - 1];
        }

        // Send message
        io.to(roomId).emit("newMessage", { roomId, message: savedMessage, tempId });
      } catch (err) {
        console.error("Error sending message:", err);
        socket.emit("error", "Failed to send message");
      }
    });

    // ---- TYPING ----
    socket.on("typing", ({ roomId, isTyping }) => {
      socket.to(roomId).emit("typingStatus", {
        senderId: socket.userId,
        isTyping
      });
    });

    // ---- MARK AS READ ----
    socket.on("markAsRead", async ({ roomId }) => {
      try {
        const userId = socket.userId;
        const chat = await Chat.findOne({ roomId });
        if (!chat) return;

        const messageDoc = await Message.findOne({ chat: chat._id });
        if (!messageDoc) return;

        let updated = false;
        messageDoc.messages.forEach((msg) => {
          if (msg.senderId.toString() !== userId.toString() && !msg.isRead) {
            msg.isRead = true;
            updated = true;
          }
        });

        if (updated) {
          await messageDoc.save();

          // Notify both users: the one in the room AND the sender personally
          io.to(roomId).emit("messagesRead", { userId });

          // Notify sender even if they’re not currently in the room
          const senderId =
            chat.sender.toString() === userId.toString()
              ? chat.receiver.toString()
              : chat.sender.toString();

          io.to(senderId).emit("messagesRead", { userId });
        }
      } catch (err) {
        console.error("Error marking messages as read:", err);
      }
    });


    // ---- GET ONLINE STATUSES ----
    socket.on("getOnlineStatuses", () => {
      try {
        const statuses = {};
        onlineUsers.forEach((socketsSet, userId) => {
          statuses[userId] = socketsSet.size > 0;
        });

        socket.emit("onlineStatuses", statuses);
      } catch (err) {
        console.error("Error fetching online statuses:", err);
        socket.emit("error", "Failed to get online statuses");
      }
    });

    // ---- LEAVE ROOM ----
    socket.on("leaveRoom", ({ roomId }) => {
      socket.leave(roomId);
      console.log(`User ${socket.userId} left room ${roomId}`);
      socket.to(roomId).emit("roomLeft", { userId: socket.userId });
    });

    // ---- UPDATE ONLINE STATUS (manual toggle) ----
    socket.on("updateOnlineStatus", async ({ userId: targetUserId, isOnline }) => {
      try {
        // Ensure the userId matches the authenticated socket
        if (targetUserId && targetUserId !== socket.userId) {
          return socket.emit("error", "Invalid userId for online status update");
        }

        const currentUserId = socket.userId;

        if (isOnline) {
          if (!onlineUsers.has(currentUserId)) onlineUsers.set(currentUserId, new Set());
          onlineUsers.get(currentUserId).add(socket.id);

          // Broadcast online to all relevant rooms
          await broadcastOnlineStatus(io, currentUserId, true);
        } else {
          const sockets = onlineUsers.get(currentUserId);
          if (sockets) {
            sockets.delete(socket.id);
            if (sockets.size === 0) {
              onlineUsers.delete(currentUserId);
              await broadcastOnlineStatus(io, currentUserId, false);
            }
          }
        }
      } catch (err) {
        console.error("Error updating online status:", err);
        socket.emit("error", "Failed to update online status");
      }
    });

    // ---- DISCONNECT ----
    socket.on("disconnect", async () => {
      const sockets = onlineUsers.get(userId);
      if (sockets) {
        sockets.delete(socket.id);
        if (sockets.size === 0) {
          onlineUsers.delete(userId);
          await broadcastOnlineStatus(io, userId, false);
        }
      }
      console.log(`User disconnected: ${userId}`);
    });
  });
};

// ---- BROADCAST ONLINE STATUS ----
async function broadcastOnlineStatus(io, userId, isOnline) {
  try {
    // Emit to all chats involving this user
    const chats = await Chat.find({
      $or: [{ sender: userId }, { receiver: userId }],
    });

    chats.forEach((chat) => {
      io.to(chat.roomId).emit("onlineStatus", { userId, isOnline });
    });

    // Also emit to the user's personal room
    io.to(userId).emit("onlineStatus", { userId, isOnline });

  } catch (err) {
    console.error("Error broadcasting online status:", err);
  }
}


export default socketHandler;
