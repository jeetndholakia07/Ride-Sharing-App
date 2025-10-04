import { type FC, useMemo } from "react";
import NavItem from "./NavItem";
import { useTranslation } from "react-i18next";
import { useRole } from "../../context/RoleContext";
import useAuth from "../../hooks/useAuth";
import NotificationButton from "../Buttons/NotificationButton";
import { useNavigate } from "react-router";
import PageLoader from "../Loading/PageLoader";

type NavMenuProps = {
    onItemClick?: () => void;
    notificationCount: number;
};

const NavMenu: FC<NavMenuProps> = ({ onItemClick, notificationCount }) => {
    const { t } = useTranslation();
    const { role } = useRole();
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    const navItems = useMemo(() => [
        { path: "/", name: t("home"), icon: "bi bi-house-door-fill" },
        { path: "/about", name: t("about"), icon: "bi bi-info-circle-fill" },
        { path: "/rides", name: t("rides"), icon: "bi bi-car-front-fill" },
        { path: "/reviews", name: t("reviews"), icon: "bi bi-star-fill" },
    ], []);

    const handleNavigate = () => {
        navigate("/profile/notifications");
    };

    const protectedItems = useMemo(() => {
        if (role === "driver") {
            return [
                { path: "/publishRide", name: t("publishRide"), icon: "bi bi-plus-circle-fill" }
            ];
        }
        else { return []; }
    }, [role]);

    if (loading) {
        return <PageLoader />
    }

    return (
        <>
            {navItems.map(({ path, name, icon }) => (
                <NavItem
                    key={name}
                    path={path}
                    name={name}
                    icon={icon}
                    onClick={onItemClick}
                />
            ))}
            {protectedItems.map(({ path, icon, name }) =>
                <NavItem
                    key={name}
                    path={path}
                    name={name}
                    icon={icon}
                    onClick={onItemClick}
                />
            )}
            {isAuthenticated && <NotificationButton unreadCount={notificationCount} handleClick={handleNavigate} />}
        </>
    );
};

export default NavMenu;
