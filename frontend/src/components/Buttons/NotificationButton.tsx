import React from "react";

interface NotificationButtonProps {
    unreadCount?: number;
    handleClick: () => void;
    className?: string;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({
    unreadCount = 0,
    handleClick,
    className = "",
}) => {
    return (
        <button
            onClick={handleClick}
            className={`relative text-gray-800 hover:cursor-pointer inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition duration-200 focus:outline-none ${className}`}
            aria-label="Notifications"
        >
            <i className="bi bi-bell-fill w-6 h-6 text-gray-700" />

            {/* Notification Badge */}
            {unreadCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-yellow-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md animate-pulse">
                    {unreadCount > 99 ? "99+" : unreadCount}
                </span>
            )}
        </button>
    )
}

export default NotificationButton;