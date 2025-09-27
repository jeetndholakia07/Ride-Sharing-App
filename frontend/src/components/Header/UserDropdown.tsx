import { useState, useRef, useEffect } from 'react';
import MenuItem from './MenuItem';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { deleteToken } from '../../IndexedDB/tokens';
import { api } from '../../hooks/api';
import apiInterceptor from '../../hooks/apiInterceptor';
import useAuth from '../../hooks/useAuth';
import PageLoader from '../Loading/PageLoader';
import { useQuery } from '@tanstack/react-query';

const UserDropdown = () => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toggleMenu = () => setOpen(!open);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleProfile = async () => {
        if (isAuthenticated) {
            try {
                const response = await apiInterceptor.get(api.profileImg);
                return response.data;
            }
            catch (err) {
                console.error("Error fetching user profile image:", err);
            }
        }
    };

    const { data: profileImg, isLoading } = useQuery({
        queryKey: ["profileImg"],
        queryFn: handleProfile,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: isAuthenticated
    });

    const handleLogout = async () => {
        await deleteToken();
        navigate("/login");
    };


    if (loading || isLoading) {
        return <PageLoader />
    }

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={toggleMenu}
                className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition duration-200"
            >
                <img
                    src={profileImg}
                    alt={t("profileImg")}
                    className="w-8 h-8 rounded-full"
                />
                <i className={`bi bi-chevron-${open ? 'up' : 'down'} text-gray-500 text-sm`} />
            </button>

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                        <MenuItem icon="bi bi-person" label={t("profile")} onClick={() => navigate("/profile")} />
                        <MenuItem icon="bi bi-car-front-fill" label={t("yourRides")} onClick={() => navigate("/profile/rideDetails")} />
                        <MenuItem icon="bi bi-bell" label={t("notifications")} onClick={() => navigate("/profile/notifications")} />
                        <MenuItem icon="bi bi-key" label={t("forgetPassword")} onClick={() => navigate("/profile/forgetPassword")} />
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