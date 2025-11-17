import { type FC, useMemo } from "react";
import NavItem from "./NavItem";
import { useTranslation } from "react-i18next";
import { getUserContext } from "../../context/UserContext";

type NavMenuProps = {
    onItemClick?: () => void;
};

const NavMenu: FC<NavMenuProps> = ({ onItemClick }) => {
    const { t } = useTranslation();
    const { getRole } = getUserContext();
    const role = getRole();

    const navItems = useMemo(() => [
        { path: "/", name: t("home"), icon: "bi bi-house-door-fill" },
        { path: "/about", name: t("about"), icon: "bi bi-info-circle-fill" },
        { path: "/rides", name: t("rides"), icon: "bi bi-car-front-fill" },
        { path: "/reviews", name: t("reviews"), icon: "bi bi-star-fill" },
    ], []);

    const protectedItems = useMemo(() => {
        if (role === "driver") {
            return [
                { path: "/publishRide", name: t("publishRide"), icon: "bi bi-plus-circle-fill" }
            ];
        }
        else { return []; }
    }, [role]);

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
        </>
    );
};

export default NavMenu;
