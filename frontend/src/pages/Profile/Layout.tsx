import { useState, useCallback } from "react";
import { Outlet } from "react-router";
import Breadcrumb from "../../components/Profile/Breadcrumb";
import SidebarNav from "../../components/Profile/SideNavbar";
import useMediaQuery from "../../utils/useMediaQuery";
import { useTranslation } from "react-i18next";

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const { t } = useTranslation();

    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen((prev) => !prev);
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen py-10 px-4">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
                {/* Sidebar Section */}
                <aside className="w-full md:w-1/4">
                    {!isDesktop && (
                        <div className="bg-white rounded-lg shadow-md mb-4">
                            <button
                                onClick={toggleSidebar}
                                className="flex items-center w-full px-4 py-3 text-gray-700 hover:text-blue-600 
                                focus:outline-none hover:cursor-pointer"
                            >
                                <i className="bi bi-list text-2xl mr-2"></i>
                                <span className="font-medium text-sm">{t("menu")}</span>
                            </button>

                            {/* Collapsible Mobile Sidebar */}
                            {isSidebarOpen && (
                                <div className="border-t border-gray-200">
                                    <SidebarNav />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Desktop Sidebar */}
                    {isDesktop && (
                        <div className="bg-white shadow-md rounded-lg overflow-hidden border-gray-200">
                            <SidebarNav />
                        </div>
                    )}
                </aside>

                {/* Main Content */}
                <main className="flex-1 w-full">
                    <div className="bg-white rounded-lg shadow-md px-6 py-6 min-h-[500px]">
                        <div className="flex items-center justify-between mb-4">
                            <Breadcrumb />
                        </div>
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;