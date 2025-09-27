import { type FC, useMemo } from "react";
import NavItem from "./NavItem";
import { useTranslation } from "react-i18next";

type NavMenuProps = {
    onItemClick?: () => void;
};

const NavMenu: FC<NavMenuProps> = ({ onItemClick }) => {
    const { t } = useTranslation();
    const navItems = useMemo(() => [
        { path: "/", name: t("home"), icon: <i className="bi bi-house-door-fill" /> },
        { path: "/about", name: t("about"), icon: <i className="bi bi-info-circle-fill" /> },
        { path: "/rides", name: t("rides"), icon: <i className="bi bi-car-front-fill" /> },
        { path: "/reviews", name: t("reviews"), icon: <i className="bi bi-star-fill" /> },
    ], []);
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
        </>
    );
};

export default NavMenu;
