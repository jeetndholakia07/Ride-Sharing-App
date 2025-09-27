import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";

const Index = () => {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 bg-cover bg-center bg-opacity-70">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg backdrop-blur-lg bg-opacity-90">
                {/* Logo */}
                <div className="flex justify-center mb-3">
                    <span className="text-3xl font-bold text-blue-700">{t("peer")}</span>
                    <span className="text-3xl font-bold text-green-700">{t("ride")}</span>
                </div>
                <Outlet />
            </div>
        </div>
    )
}
export default Index;