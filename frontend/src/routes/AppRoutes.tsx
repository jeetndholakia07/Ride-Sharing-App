import { Route, Routes } from "react-router-dom";
import MainLayout from "../pages/MainLayout";
import NotFoundPage from "../pages/Error/NotFound";
import AboutPage from "../pages/About/index";
import LoginPage from "../pages/AuthLayout/Login";
import SignupPage from "../pages/AuthLayout/Signup";
import HomePage from "../pages/Home/index";
import Rides from "../pages/Rides/index";
import RideDetails from "../components/Ride/RideDetails.js";
import ReviewPage from "../pages/Reviews/index";
import AuthLayout from "../pages/AuthLayout/index.js";
import PublicRoutes from "./PublicRoutes.js";
import PrivateRoutes from "./PrivateRoutes.js";
import ProfileRoutes from "../pages/Profile/ProfileRoutes.js";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Pages - Accessible to everyone */}
            <Route element={<MainLayout />}>
                <Route path="/" index element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/rides" element={<Rides />} />
                <Route path="/rides/:id" element={<RideDetails />} />
                <Route path="/reviews" element={<ReviewPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/*Auth Routes */}
            <Route element={<PublicRoutes />}>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Route>
            </Route>

            {/* Private Routes */}
            <Route element={<PrivateRoutes />}>
                <Route element={<MainLayout />}>
                    <Route path="/profile/*" element={<ProfileRoutes />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;