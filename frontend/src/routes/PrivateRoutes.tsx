import { Navigate, Outlet } from "react-router-dom";
import PageLoader from "../components/Loading/PageLoader.js";
import useAuth from "../hooks/useAuth.js";

const PrivateRoutes = () => {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return <PageLoader />
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
export default PrivateRoutes;