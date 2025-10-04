import { type FC } from "react";
import { formatDateTime } from "../../utils/dateFormat";
import MarkAsRead from "../Buttons/MarkAsRead";

type Props = {
    notifications: any[];
    onMarkAsRead: (id: string) => void;
};

const NotificationDisplay: FC<Props> = ({ notifications, onMarkAsRead }) => {
    return (
        <div className="space-y-4">
            {notifications.map((notif) => (
                <div
                    key={notif._id}
                    className={`flex justify-between items-start p-4 rounded-lg shadow-sm border transition ${notif.isRead
                        ? "bg-gray-50 border-gray-200"
                        : "bg-white border-blue-300"
                        }`}
                >
                    <div className="flex items-start gap-3">
                        <div className="pt-1">
                            <i
                                className={`bi ${notif.isRead ? "bi-envelope-open" : "bi-envelope-fill"
                                    } text-xl ${notif.isRead ? "text-gray-400" : "text-blue-600"
                                    }`}
                            ></i>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800">{notif.heading}</h4>
                            <p className="text-sm text-gray-600">{notif.message}</p>
                            <span className="text-xs text-gray-400">
                                {formatDateTime(notif.createdAt)}
                            </span>
                        </div>
                    </div>

                    {!notif.isRead && (
                        <MarkAsRead handleClick={() => onMarkAsRead(notif._id)} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default NotificationDisplay;
