import { type FC } from "react";
import MarkAllAsRead from "../Buttons/MarkAllAsRead";
import { getNotificationContext } from "../../context/NotificationContext";

const tabOptions = [
    { label: "All", value: undefined, icon: "bi-bell" },
    { label: "Unread", value: false, icon: "bi-envelope" },
    { label: "Read", value: true, icon: "bi-envelope-open" },
];

type Props = {
    currentFilter: any;
    onFilterChange: (value: any) => void;
    onMarkAllAsRead: () => void;
};

const NotificationHeader: FC<Props> = ({
    currentFilter,
    onFilterChange,
    onMarkAllAsRead,
}) => {
    const { notificationCount } = getNotificationContext();
    return (
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <div className="flex space-x-2">
                {tabOptions.map((tab) => (
                    <button
                        key={tab.label}
                        onClick={() => onFilterChange(tab.value)}
                        className={`flex items-center hover:cursor-pointer gap-1 px-4 py-2 rounded-md text-sm font-medium transition ${currentFilter === tab.value
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        <i className={`bi ${tab.icon}`}></i>
                        {tab.label}
                    </button>
                ))}
            </div>
            <MarkAllAsRead
                handleClick={onMarkAllAsRead}
                disabled={notificationCount === 0}
            />
        </div>
    );
};

export default NotificationHeader;