import { createContext, useContext, useState, type FC, type ReactNode, type Dispatch, type SetStateAction, useRef } from "react";

export type User = {
    id: string;
    username: string;
    role: "passenger" | "driver" | null;
};

interface UserContextProps {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    getRole: () => any;
    hasValidatedRef: any;
};

interface UserContextProvider {
    children: ReactNode;
};

const UserContext = createContext<UserContextProps | null>(null);

export const getUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("User context must be used within a Provider");
    }
    return context;
}

export const UserProvider: FC<UserContextProvider> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const hasValidatedRef = useRef(false);

    const getRole = () => {
        return user?.role;
    };

    return (
        <UserContext.Provider value={{ user, setUser, getRole, hasValidatedRef }}>
            {children}
        </UserContext.Provider>
    );
};