import { memo, type FC } from "react";
import { formatMsgTimestamp } from "../../utils/dateFormat";

type MessageProps = {
    msg: any;
    currentUserId: string;
    isRead?: boolean;
};

const MessageItem: FC<MessageProps> = memo(({ msg, currentUserId, isRead }) => {
    const isCurrentUser = msg.senderId === currentUserId;
    const readStatus = isRead ?? msg.isRead; // use prop if passed, fallback to msg.isRead

    return (
        <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} px-4 py-1`}>
            <div
                className={`
          relative
          rounded-tl-2xl rounded-tr-2xl 
          rounded-b-${isCurrentUser ? "2xl" : "none"} rounded-bl-${isCurrentUser ? "none" : "2xl"}
          p-3
          shadow-sm
          break-words
          text-sm sm:text-base
          max-w-[75%] sm:max-w-[60%] md:max-w-[50%]
          ${isCurrentUser ? "bg-[#DCF8C6] text-gray-900" : "bg-white text-gray-800"}
        `}
            >
                <p className="whitespace-pre-wrap">{msg.content}</p>

                {/* Timestamp + Read receipt */}
                <div className="flex justify-end items-center space-x-1 mt-1">
                    {isCurrentUser && (
                        <span className={`text-xs font-bold ${readStatus ? "text-blue-600" : "text-gray-400"}`}>
                            {readStatus ? "✓✓" : "✓"}
                        </span>
                    )}
                    <span className="text-[10px] sm:text-xs text-gray-500">
                        {formatMsgTimestamp(msg.createdAt)}
                    </span>
                </div>
            </div>
        </div>
    );
});

export default MessageItem;
