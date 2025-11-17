import { useEffect, useRef, useState } from "react";
import { getUserContext } from "../context/UserContext";
import apiInterceptor from "./apiInterceptor";
import { api } from "./api";

const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { user, setUser, hasValidatedRef } = getUserContext();
    const didValidate = useRef(false);
    useEffect(() => {
        if (didValidate.current || hasValidatedRef?.current) {
            if (user) setIsAuthenticated(true);
            setLoading(false);
            return;
        }
        const validate = async () => {
            try {
                const res = await apiInterceptor.get(api.auth.validateUser);
                const { userId, username, role } = res.data;
                setUser({ id: userId, username: username, role: role });
                setIsAuthenticated(true);
                hasValidatedRef.current = true;
            } catch (err) {
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
                didValidate.current = true;
            }
        };
        validate();
    }, []);

    const authenticateUser = (userData: any) => {
        setUser({ id: userData.userId, username: userData.username, role: userData.role });
        setIsAuthenticated(true);
        hasValidatedRef.current = true;
        setLoading(false);
    };

    return { isAuthenticated, loading, authenticateUser };
};

export default useAuth;