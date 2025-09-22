import { useEffect, useState } from "react";
import { findToken } from "../IndexedDB/tokens.js";

const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const check = async () => {
            const token = await findToken();
            if (token) {
                setIsAuthenticated(true);
                setLoading(false);
            }
            else {
                setIsAuthenticated(false);
                setLoading(false);
            }
        };
        check();
    }, []);

    return { isAuthenticated, loading };
};

export default useAuth;