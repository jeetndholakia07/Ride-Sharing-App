import type { FC, ChangeEvent, KeyboardEvent, FocusEvent } from "react";

type MessageInputProps = {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
    onSend: () => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};

const MessageInput: FC<MessageInputProps> = ({ value, onChange, onKeyDown, onSend, onBlur }) => {
    return (
        <div className="absolute bottom-0 left-0 w-full p-3 bg-[#f0f2f5] flex items-center gap-3 border-t border-gray-200">
            <input
                type="text"
                placeholder="Type a message"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                className="flex-1 bg-white text-gray-800 rounded-full px-4 py-2.5 focus:outline-none placeholder-gray-500 shadow-sm"
            />
            <button
                onClick={onSend}
                className="relative group bg-[#075E54] hover:bg-[#0a4c45] text-white rounded-full w-14 h-14 
                flex items-center justify-center shadow-md transition-all duration-200 ease-in-out hover:cursor-pointer"
            >
                <i className="bi bi-send-fill text-xl"></i>
            </button>
        </div>
    );
};

export default MessageInput;
