import { Route, Routes } from "react-router";
import MainLayout from "../pages/MainLayout";
import ServicesPage from "../pages/Services/index";
import NotFoundPage from "../pages/Error/NotFound";
import AboutPage from "../pages/About/index";
import LoginPage from "../pages/AuthLayout/Login";
import SignupPage from "../pages/AuthLayout/Signup";
import HomePage from "../pages/Home/index";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="/" index element={<HomePage/>}/>
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
        </Routes>
    )
}
export default AppRoutes;