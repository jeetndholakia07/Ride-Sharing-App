import { useQuery } from "@tanstack/react-query";
import apiInterceptor from "../../hooks/apiInterceptor";
import { api } from "../../hooks/api";
import Chats from "../../components/Chat/Chats";
import PageLoader from "../../components/Loading/PageLoader";
import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";

const UserChatsPage = () => {
    const { socket } = useSocket();
    const [onlineStatusMap, setOnlineStatusMap] = useState<Record<string, boolean>>({});

    const fetchUserChats = async () => {
        try {
            const response = await apiInterceptor.get(api.chat.userChats);
            return response.data;
        } catch (err) {
            console.error("Error fetching user chats:", err);
            return [];
        }
    };

    const { data: chatUsers, isLoading: isChatsLoading } = useQuery({
        queryKey: ["userChats"],
        queryFn: fetchUserChats,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 0
    });

    // Fetch online statuses when socket is ready
    useEffect(() => {
        if (!socket) return;

        // Request online statuses
        socket.emit("getOnlineStatuses");

        const handleOnlineStatuses = (statuses: Record<string, boolean>) => {
            setOnlineStatusMap(statuses);
        };

        socket.on("onlineStatuses", handleOnlineStatuses);

        // Optional: update status in real-time
        socket.on("onlineStatus", ({ userId, isOnline }) => {
            setOnlineStatusMap(prev => ({ ...prev, [userId]: isOnline }));
        });

        return () => {
            socket.off("onlineStatuses", handleOnlineStatuses);
            socket.off("onlineStatus");
        };
    }, [socket]);

    if (isChatsLoading) return <PageLoader />;

    return <Chats chatUsers={chatUsers} onlineStatusMap={onlineStatusMap} />;
};

export default UserChatsPage;
