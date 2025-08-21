import type { FC } from "react";
import { NavLink } from "react-router-dom";

type NavItemProps = {
    onClick?: () => void;
}

const NavItems = [
    {
        path: "/",
        name: "Home",
        icon: ""
    },
    {
        path: "/services",
        name: "Services",
        icon: ""
    },
    {
        path: "/about",
        name: "About",
        icon: ""
    },
    {
        path: "/rides",
        name: "Rides",
        icon: ""
    },
    {
        path: "/help",
        name: "Help",
        icon: ""
    },
];

const NavItem: FC<NavItemProps> = ({ onClick }) => {
    return (
        <>
            {NavItems.map((item) => {
                return (
                    <NavLink
                        to={item.path}
                        className={({isActive})=>`text-gray-700 hover:text-green-700 text-md font-medium
                        ${isActive && "text-green-700 font-bold"}`}
                        onClick={onClick && onClick}
                    >
                        {item.icon}
                        {item.name}
                    </NavLink>
                )
            })}
        </>
    );
};

export default NavItem;