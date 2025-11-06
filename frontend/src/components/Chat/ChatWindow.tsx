import { useEffect, useRef, useState, useCallback, type FC } from "react";
import MessageItem from "./MessageItem";
import "./style.css";
import MessageInput from "./MessageInput";
import ScrollBottom from "./ScrollBottom";
import Typing from "./Typing";
import { useSocket } from "../../context/SocketContext";
import debounce from "lodash.debounce";
import { groupMessagesByDay } from "../../utils/dateFormat";

type ChatProps = {
    chat: any;
    previousMessages: any[];
    height?: string;
    onBack: () => void;
};

const ChatWindow: FC<ChatProps> = ({ chat, previousMessages, height = "500px", onBack }) => {
    const { socket } = useSocket();
    const [messages, setMessages] = useState<any[]>(previousMessages);
    const [newMessage, setNewMessage] = useState("");
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);
    const [otherUserOnline, setOtherUserOnline] = useState<boolean>(false);
    const [otherUserTyping, setOtherUserTyping] = useState(false);

    const containerRef = useRef<HTMLDivElement | null>(null);

    // Scroll to bottom
    const scrollToBottom = useCallback(() => {
        const container = containerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
            setShowScrollToBottom(false);
        }
    }, []);

    // Debounced typing emitter
    const emitTypingStatus = useCallback(
        debounce((typing: boolean) => {
            if (!socket) return;
            socket.emit("typing", { roomId: chat.roomId, isTyping: typing });
        }, 500),
        [chat.roomId, socket]
    );

    const handleTyping = (e: any) => {
        setNewMessage(e.target.value);
        emitTypingStatus(!!e.target.value);
    };

    const handleBlur = () => {
        emitTypingStatus.cancel();
        emitTypingStatus(false);
        setOtherUserTyping(false);
    };

    const handleSend = async () => {
        if (!socket || !newMessage.trim()) return;

        const tempId = `temp-${new Date().getTime()}`;
        const optimisticMessage = {
            tempId,
            content: newMessage.trim(),
            senderId: chat.user.id,
            createdAt: new Date(),
            isRead: false,
        };

        setMessages((prev) => [...prev, optimisticMessage]);
        setNewMessage("");
        emitTypingStatus(false);

        socket.emit("sendMessage", {
            roomId: chat.roomId,
            content: optimisticMessage.content,
            tempId,
        });
    };

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.stopPropagation();
            if (!e.repeat) handleSend();
        }
    };

    const handleBack = () => {
        socket?.emit("leaveRoom", { roomId: chat.roomId });
        onBack();
    };

    const emitMarkAsRead = useCallback(() => {
        socket?.emit("markAsRead", { roomId: chat.roomId });
        setMessages((prev) =>
            prev.map((msg) =>
                msg.senderId === chat.otherUser.id ? { ...msg, isRead: true } : msg
            )
        );
    }, [chat.roomId, socket, otherUserOnline]);

    useEffect(() => {
        emitMarkAsRead();
    }, []);

    // Setup socket events
    useEffect(() => {
        if (!socket) return;

        socket.emit("joinRoom", { roomId: chat.roomId });

        socket.emit("updateOnlineStatus", { isOnline: true });

        const handleRoomJoined = ({ userId }: { userId: string }) => {
            if (userId === chat.otherUser.id) {
                // Only mark as read if the other user joined
                setOtherUserOnline(true);
                emitMarkAsRead();
            }
        };

        const handleRoomLeft = ({ userId }: { userId: string }) => {
            if (userId === chat.otherUser.id) {
                setOtherUserOnline(false);
            }
        };

        const handleNewMessage = ({ roomId, message, tempId }: any) => {
            if (roomId !== chat.roomId) return;

            setMessages((prev) => {
                if (tempId && prev.some((m) => m.tempId === tempId)) {
                    return prev.map((m) => (m.tempId === tempId ? { ...message } : m));
                } else if (!prev.some((m) => m._id === message._id)) {
                    return [...prev, message];
                }
                return prev;
            });

            if (message.senderId === chat.otherUser.id) {
                emitMarkAsRead();
            }
        };

        const handleTypingStatus = ({ senderId, isTyping }: any) => {
            if (senderId === chat.otherUser.id) setOtherUserTyping(isTyping);
        };

        const handleMessagesRead = ({ userId }: any) => {
            if (userId === chat.otherUser.id) {
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.senderId === chat.user.id ? { ...msg, isRead: true } : msg
                    )
                );
            }
        };

        const handleOnlineStatus = ({ userId, isOnline }: { userId: string; isOnline: boolean }) => {
            if (userId === chat.otherUser.id) {
                setOtherUserOnline(isOnline);
            }
        };

        socket.on("newMessage", handleNewMessage);
        socket.on("typingStatus", handleTypingStatus);
        socket.on("messagesRead", handleMessagesRead);
        socket.on("onlineStatus", handleOnlineStatus);
        socket.on("roomJoined", handleRoomJoined);
        socket.on("roomLeft", handleRoomLeft);

        return () => {
            socket.emit("updateOnlineStatus", { isOnline: false });
            socket.off("newMessage", handleNewMessage);
            socket.off("typingStatus", handleTypingStatus);
            socket.off("onlineStatus", handleOnlineStatus);
            socket.off("messagesRead", handleMessagesRead);
            socket.off("roomJoined", handleRoomJoined);
            socket.off("roomLeft", handleRoomLeft);
        };
    }, [socket, chat.roomId]);

    // Auto-scroll
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const isNearBottom =
            container.scrollHeight - container.scrollTop - container.clientHeight < 100;
        if (isNearBottom) scrollToBottom();
    }, [messages, scrollToBottom]);

    const groupedMessages = groupMessagesByDay(messages);
    const otherUser = chat.otherUser;

    return (
        <div
            className="flex flex-col relative bg-[#efeae2] border border-gray-200 rounded-md"
            style={{ height }}
        >
            {/* Header */}
            <div className="flex items-center p-3 bg-[#075E54] text-white shadow-md sticky top-0 z-10">
                <button
                    onClick={handleBack}
                    className="p-2 mr-3 hover:bg-[#064c46] rounded-full transition hover:cursor-pointer"
                >
                    <i className="bi bi-arrow-left text-2xl"></i>
                </button>

                {otherUser.profileImg ? (
                    <img
                        src={otherUser.profileImg}
                        alt={otherUser.username}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center text-gray-600 font-bold">
                        {otherUser.username[0]}
                    </div>
                )}

                <div>
                    <p className="font-semibold text-white text-base">{otherUser.username}</p>
                    <p
                        className={`text-xs ${otherUserOnline ? "text-[#d9fdd3]" : "text-gray-300"
                            } font-medium`}
                    >
                        {otherUserOnline ? "Online" : "Offline"}
                    </p>
                </div>
            </div>

            {/* Messages */}
            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-custom"
            >
                {Object.keys(groupedMessages).map((day) => (
                    <div key={day}>
                        <div className="flex justify-center my-4">
                            <div className="bg-[#d9fdd3] text-gray-700 px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                                {day}
                            </div>
                        </div>
                        {groupedMessages[day].map((msg: any) => (
                            <MessageItem
                                key={msg._id ?? msg.tempId}
                                msg={msg}
                                currentUserId={chat.user.id}
                                isRead={msg.isRead}
                            />
                        ))}
                    </div>
                ))}

                {otherUserTyping && <Typing />}
                <div className="h-20"></div>
            </div>

            {showScrollToBottom && <ScrollBottom onClick={scrollToBottom} />}
            <MessageInput
                value={newMessage}
                onChange={handleTyping}
                onKeyDown={handleKeyDown}
                onSend={handleSend}
                onBlur={handleBlur}
            />
        </div>
    );
};

export default ChatWindow;
