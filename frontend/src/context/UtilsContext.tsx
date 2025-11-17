import { createContext, useContext, type ReactNode, type FC, useState } from "react";

interface UtilContextProps {
    seats: number;
    setSeats: (seat: number) => void;
    pickup: any;
    setPickup: (pickup: any) => void;
    dropoff: any;
    setDropoff: (dropoff: any) => void;
}

interface UtilContextProvider {
    children?: ReactNode;
}

const UtilContext = createContext<UtilContextProps | undefined>(undefined);

export const getUtilContext = () => {
    const context = useContext(UtilContext);
    if (!context) {
        throw new Error("utilContext must be used within a util context provider");
    }
    return context;
};

export const UtilContextProvider: FC<UtilContextProvider> = ({ children }) => {
    const [seats, setSeats] = useState<number>(1);
    const [pickup, setPickup] = useState<any>(null);
    const [dropoff, setDropoff] = useState<any>(null);

    return (
        <UtilContext.Provider value={{ seats, setSeats, pickup, setPickup, dropoff, setDropoff }}>
            {children}
        </UtilContext.Provider>
    )
};