import { type FC } from "react";

type menuItemProps = {
    icon: string;
    label: string;
    onClick: any;
    isLogout?: boolean;
    isNotification?: boolean;
    notificationCount?: number;
}

const MenuItem: FC<menuItemProps> = ({ icon, label, onClick, isLogout, isNotification, notificationCount }) => {
    return (
        <button
            className={`flex items-center w-full px-4 py-2 hover:cursor-pointer text-sm transition-colors duration-150 ${isLogout
                ? 'text-red-600 hover:bg-red-50'
                : 'text-gray-700 hover:bg-gray-100'
                }`}
            onClick={onClick}
        >
            <i className={`${icon} text-lg mr-3`} />
            {label}
            {(isNotification && notificationCount && notificationCount > 0) &&
                <span className="relative top-0 ml-5 bg-yellow-600 
            text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md animate-pulse">
                    {notificationCount > 99 ? "99+" : notificationCount}
                </span>
            }
        </button>
    )
}
export default MenuItem;