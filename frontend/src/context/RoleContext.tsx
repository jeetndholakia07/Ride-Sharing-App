import { useState, useEffect, useContext, createContext, type ReactNode, type FC } from "react";
import { findRole } from "../IndexedDB/tokens";

export type Role = "driver" | "passenger" | null;

interface RoleContextProps {
    role: Role;
    setRole: (role: Role) => void;
};

interface RoleProviderProps {
    children: ReactNode;
}

const RoleContext = createContext<RoleContextProps | undefined>(undefined);

export const useRole = () => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error("useRole must be used within a RoleProvider");
    }
    return context;
};

export const RoleProvider: FC<RoleProviderProps> = ({ children }) => {
    const [role, setRole] = useState<Role>(null);

    useEffect(() => {
        const loadRole = async () => {
            const storedRole = await findRole();
            if (storedRole) {
                setRole(storedRole);
            }
        };
        loadRole();
    }, []);

    return (
        <RoleContext.Provider value={{ role, setRole }}>
            {children}
        </RoleContext.Provider>
    )
}