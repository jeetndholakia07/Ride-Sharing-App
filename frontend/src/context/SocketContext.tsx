import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { io, type Socket } from "socket.io-client";
import { getUserContext } from "./UserContext";

type SocketContextType = {
    socket: Socket | null;
    disconnect: () => void;
};

const SocketContext = createContext<SocketContextType>({
    socket: null,
    disconnect: () => { },
});

const socketURL = import.meta.env.VITE_API_BASE_URL;

type SocketProviderProps = {
    children: ReactNode;
};

export const SocketProvider = ({ children }: SocketProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const { user, hasValidatedRef } = getUserContext();
    const socketRef = useRef<Socket | null>(null);

    // Initialize socket when authenticated
    useEffect(() => {
        if (user && hasValidatedRef?.current && !socketRef.current) {
            const socketInstance = io(socketURL, { withCredentials: true });
            socketRef.current = socketInstance;
            setSocket(socketInstance);

            return () => {
                socketInstance.disconnect();
                socketRef.current = null;
                setSocket(null);
            };
        }
    }, [user]);

    // Disconnect socket when logging out
    useEffect(() => {
        if (!user && socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
            setSocket(null);
        }
    }, [user]);

    const disconnect = () => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
            setSocket(null);
        }
    };

    return (
        <SocketContext.Provider value={{ socket, disconnect }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);