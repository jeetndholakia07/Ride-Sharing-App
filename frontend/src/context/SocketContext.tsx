import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { io, type Socket } from "socket.io-client";
import { findToken } from "../IndexedDB/tokens";
import useAuth from "../hooks/useAuth";

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
    const { isAuthenticated, loading } = useAuth();
    const socketRef = useRef<Socket | null>(null);

    // Initialize socket when authenticated
    useEffect(() => {
        let isMounted = true;

        const setupSocket = async () => {
            if (!isAuthenticated || loading) return;

            const token = await findToken();
            if (!token || !isMounted) return;

            // If socket already exists, reuse it
            if (socketRef.current) {
                setSocket(socketRef.current);
                return;
            }

            const socketInstance = io(socketURL, { auth: { token } });
            socketRef.current = socketInstance;
            setSocket(socketInstance);
        };

        setupSocket();

        return () => {
            isMounted = false;
        };
    }, [isAuthenticated]);

    // Disconnect socket when logging out
    useEffect(() => {
        if (!isAuthenticated && socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
            setSocket(null);
        }
    }, [isAuthenticated]);

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