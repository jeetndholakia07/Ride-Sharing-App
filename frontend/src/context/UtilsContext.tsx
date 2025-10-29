import { createContext, useContext, type ReactNode, type FC, useState } from "react";

export type typeUsage = "ride request" | "view" | null;

interface UtilContextProps {
    typeUsage: typeUsage;
    setTypeUsage: (type: typeUsage) => void;
    seats: number;
    setSeats: (seat: number) => void;
}

interface UtilContextProvider {
    children?: ReactNode;
}

const UtilContext = createContext<UtilContextProps | undefined>(undefined);

export const getUtilContext = () => {
    const context = useContext(UtilContext);
    if (!context) {
        throw new Error("getTypeUsage must be used within a type usage provider");
    }
    return context;
};

export const UtilContextProvider: FC<UtilContextProvider> = ({ children }) => {
    const [typeUsage, setTypeUsage] = useState<typeUsage>("ride request");
    const [seats, setSeats] = useState<number>(1);

    return (
        <UtilContext.Provider value={{ typeUsage, setTypeUsage, seats, setSeats }}>
            {children}
        </UtilContext.Provider>
    )
};