import { useLocation, useNavigate, useParams } from "react-router"
import NotFound from "../Error/NotFound";
import ChatWindow from "../../components/Chat/ChatWindow";
import apiInterceptor from "../../hooks/apiInterceptor";
import { api } from "../../hooks/api";
import { useQuery } from "@tanstack/react-query";
import PageLoader from "../../components/Loading/PageLoader";
import useInvalidateQuery from "../../hooks/useInvalidateQuery";

const ChatPage = () => {
    const params = useParams();
    const roomId = params?.roomId;
    const location = useLocation();
    const data = location?.state.data;
    const navigate = useNavigate();
    const invalidateQuery = useInvalidateQuery();

    if (!roomId || !data) {
        return <NotFound />;
    };

    const fetchMessages = async () => {
        try {
            const response = await apiInterceptor.get(api.chat.messages, { params: { roomId: data.roomId } });
            return response.data.messages;
        } catch (err) {
            console.error("Error fetching messages:", err);
            return [];
        }
    };

    const { data: messages, isLoading } = useQuery({
        queryKey: ["chatMessages", roomId],
        queryFn: fetchMessages,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 0, // ensures it's considered stale immediately
    });

    const handleBack = () => {
        invalidateQuery(["userChats"]);
        invalidateQuery(["chatMessages"]);
        invalidateQuery(["chatUnreadCount"]);
        navigate("/profile/chats");
    };

    if (isLoading) {
        return <PageLoader />;
    };

    return (
        <ChatWindow
            chat={data}
            previousMessages={messages}
            onBack={handleBack}
        />
    )
}

export default ChatPage;