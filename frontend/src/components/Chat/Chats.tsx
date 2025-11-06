import { useState, type FC } from "react";
import NotFound from "../../pages/Error/NotFound";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { formatMessageDate } from "../../utils/dateFormat";

type Props = {
    chatUsers: any[];
    onlineStatusMap: Record<string, boolean>;
};

const Chats: FC<Props> = ({
    chatUsers,
    onlineStatusMap
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const { t } = useTranslation();

    const filteredUsers = chatUsers.filter(
        (chatUser) =>
            chatUser?.otherUser?.username &&
            chatUser.otherUser.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectUser = (chat: any) => {
        navigate(`/profile/chats/${chat.roomId}`, { state: { data: chat } });
    };

    return (
        <div className="w-full h-full flex flex-col rounded-md bg-[#f8fafc]">
            {/* Header */}
            <div className="p-4 bg-[#075E54] text-white rounded-md font-semibold text-lg shadow-md">
                {t("chats")}
            </div>

            {/* Search Bar */}
            <SearchBar
                searchTerm={searchTerm}
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
            />

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-custom">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((chat) => {
                        const otherUser = chat.otherUser;
                        const latestMessageDate = chat.latestMessage?.createdAt;
                        return (
                            <div
                                key={otherUser.id}
                                onClick={() => handleSelectUser(chat)}
                                className={`flex items-center gap-4 p-3 cursor-pointer rounded-xl transition-all w-full border
                                bg-white border-gray-200 hover:bg-[#e7f5ec]`}
                            >
                                {/* Profile Image */}
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={otherUser.profileImg}
                                        alt={otherUser.username}
                                        className="w-12 h-12 rounded-full object-cover border border-gray-200"
                                    />
                                    <span
                                        className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white
                                            ${onlineStatusMap[otherUser.id]
                                                ? "bg-[#25D366]"
                                                : "bg-gray-400"
                                            }`}
                                    />
                                </div>

                                {/* User Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-semibold text-gray-800 truncate">
                                            {otherUser.username}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            {latestMessageDate && (
                                                <span className="text-xs text-gray-400 flex-shrink-0">
                                                    {formatMessageDate(latestMessageDate)}
                                                </span>
                                            )}
                                            {chat.unreadCount > 0 && (
                                                <span className="flex-shrink-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#25D366] rounded-full">
                                                    {chat.unreadCount}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 truncate">
                                        {otherUser.role}
                                    </p>
                                    {chat.latestMessage && (
                                        <p className="text-sm text-gray-500 truncate mt-1">
                                            {chat.latestMessage.content}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <NotFound />
                )}
            </div>
        </div>
    );
};

export default Chats;
