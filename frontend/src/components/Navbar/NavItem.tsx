import type { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";

type NavItemProps = {
    name: string;
    path: string;
    icon?: string;
    onClick?: () => void;
};

const NavItem: FC<NavItemProps> = ({ name, path, icon, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === path;

    return (
        <NavLink
            to={path}
            onClick={onClick}
            className={`flex items-center px-3 py-2 rounded transition duration-150
                ${isActive ? " " : "text-gray-700 hover:bg-gray-100"}`}
        >
            {icon && (
                <span className={`mr-3 ${isActive ? "text-green-700" : "text-gray-600"}`}>
                    <i className={icon} />
                </span>
            )}
            <span className={`text-sm font-medium ${isActive ? "text-green-700" : "text-gray-700"}`}>
                {name}
            </span>
        </NavLink>
    );
};

export default NavItem;