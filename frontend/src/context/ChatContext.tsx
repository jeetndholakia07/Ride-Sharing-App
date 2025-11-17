import { createContext, useState, type FC, type ReactNode, useContext } from "react";

interface ChatProps {
    chatUnreadCount: number;
    setChatUnreadCount: (count: number) => void;
}

interface ChatProviderProps {
    children?: ReactNode;
}

const ChatContext = createContext<ChatProps | undefined>(undefined);

export const getChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("Chat context must be used within a Provider");
    }
    return context;
}
export const ChatProvider: FC<ChatProviderProps> = ({ children }) => {
    const [chatUnreadCount, setChatUnreadCount] = useState(0);

    return (
        <ChatContext.Provider value={{ chatUnreadCount, setChatUnreadCount }}>
            {children}
        </ChatContext.Provider>
    )
}