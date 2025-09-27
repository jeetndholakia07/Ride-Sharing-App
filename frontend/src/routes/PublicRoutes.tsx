import { Navigate, Outlet } from "react-router-dom";
import PageLoader from "../components/Loading/PageLoader.js";
import useAuth from "../hooks/useAuth.js";

const PublicRoutes = () => {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return <PageLoader />
    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />
}
export default PublicRoutes;