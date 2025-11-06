import type { FC } from "react";

type searchProps = {
    searchTerm: string;
    value: any;
    onChange: any;
}

const SearchBar: FC<searchProps> = ({ searchTerm, value, onChange }) => {
    return (
        <div className="w-full p-3 bg-[#f8fafc] border-b border-gray-200">
            <div
                className={`flex items-center bg-white border px-3 py-2.5 rounded-full shadow-sm transition-all
                        ${searchTerm
                        ? "border-[#075E54] ring-1 ring-[#075E54]/30"
                        : "border-gray-300 hover:border-[#075E54]/50"
                    }`}
            >
                <i className="bi bi-search text-md text-gray-500 mr-2"></i>
                <input
                    type="text"
                    placeholder="Search or start new chat"
                    value={value}
                    onChange={onChange}
                    className="bg-transparent flex-1 outline-none text-sm text-gray-700 placeholder-gray-500"
                />
            </div>
        </div>
    )
}

export default SearchBar;