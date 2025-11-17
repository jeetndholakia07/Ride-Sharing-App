import { createContext, useState, type FC, type ReactNode, useContext } from "react";

interface NotificationProps {
    notificationCount: number;
    setNotificationCount: (count: number) => void;
}

interface NotificationProviderProps {
    children?: ReactNode;
}

const NotificationContext = createContext<NotificationProps | undefined>(undefined);

export const getNotificationContext = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("Notification context must be used within a Provider");
    }
    return context;
}

export const NotificationProvider: FC<NotificationProviderProps> = ({ children }) => {
    const [notificationCount, setNotificationCount] = useState(0);

    return (
        <NotificationContext.Provider value={{ notificationCount, setNotificationCount }}>
            {children}
        </NotificationContext.Provider>
    )
}