import { useState, useRef, useEffect, type FC } from 'react';
import MenuItem from './MenuItem';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { api } from '../../hooks/api';
import apiInterceptor from '../../hooks/apiInterceptor';
import useAuth from '../../hooks/useAuth';
import PageLoader from '../Loading/PageLoader';
import { useQuery } from '@tanstack/react-query';
import { getUserContext } from '../../context/UserContext';
import { useSocket } from '../../context/SocketContext';

type props = {
    notificationCount?: number;
    chatUnreadCount?: number;
}

const UserDropdown: FC<props> = ({ notificationCount, chatUnreadCount }) => {
    const [open, setOpen] = useState(false);
    const { user, setUser, hasValidatedRef } = getUserContext();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toggleMenu = () => setOpen(!open);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isAuthenticated, loading } = useAuth();
    const { disconnect } = useSocket();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleProfileImg = async () => {
        if (isAuthenticated) {
            try {
                const response = await apiInterceptor.get(api.user.profileImg);
                return response.data;
            }
            catch (err) {
                console.error("Error fetching user profile image:", err);
            }
        }
    };

    const { data: profileImg, isLoading } = useQuery({
        queryKey: ["profileImg"],
        queryFn: handleProfileImg,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: isAuthenticated
    });

    const handleLogout = async () => {
        try {
            disconnect();
            const res = await apiInterceptor.post(api.auth.logoutUser);
            if (res.data.success) {
                setUser(null);
                hasValidatedRef.current = false;
                navigate("/login");
            }
        } catch (err) {
            console.error("Error logging out:", err);
        }
    };

    if (loading || isLoading) {
        return <PageLoader />
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={toggleMenu}
                className="flex items-center space-x-1 focus:outline-none hover:cursor-pointer"
                aria-label="Toggle user menu"
            >
                <div className="relative w-[2.5rem] h-[2.5rem]">
                    <span className="absolute inset-0 rounded-full border-2 font-bold border-blue-400 animate-pulse"></span>
                    <img
                        src={profileImg}
                        alt={t("profileImg")}
                        className="w-[2.5rem] h-[2.5rem] rounded-full cursor-pointer relative z-10"
                    />
                </div>
                <i className={`bi bi-chevron-${open ? 'up' : 'down'} text-gray-500 text-sm`} />
            </button>

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-lg z-50">
                    <div className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                            <i className="bi bi-person-circle text-blue-500 text-lg" />
                            <div className="text-sm text-gray-700 font-medium">
                                {t("welcome")}, <span className="font-semibold text-gray-900">{user?.username}</span>
                            </div>
                        </div>
                    </div>
                    <div className="py-2">
                        <MenuItem icon="bi bi-person" label={t("profile")} onClick={() => navigate("/profile")} />
                        <MenuItem icon="bi bi-car-front-fill" label={t("yourRides")} onClick={() => navigate("/profile/rides")} />
                        <MenuItem icon="bi bi-bell" label={t("notifications")} onClick={() => navigate("/profile/notifications")}
                            isNotification={true} notificationCount={notificationCount}
                        />
                        <MenuItem icon="bi bi-chat-dots-fill" label={t("chats")} onClick={() => navigate("/profile/chats")}
                            isChat={true} chatUnreadCount={chatUnreadCount}
                        />
                        <MenuItem icon="bi bi-key" label={t("forgetPassword")} onClick={() => navigate("/profile/forget-password")} />
                    </div>
                    <div className="py-2">
                        <MenuItem icon="bi bi-box-arrow-right" label={t("logout")} isLogout={true} onClick={() => handleLogout()} />
                    </div>
                </div>
            )}
        </div>
    );
};
export default UserDropdown;