import { type FC } from "react";

type menuItemProps = {
    icon: React.ReactNode;
    label: string;
    onClick: any;
    isLogout?: boolean;
}

const MenuItem: FC<menuItemProps> = ({ icon, label, onClick, isLogout }) => {
    return (
        <button
            className={`flex items-center w-full px-4 py-2 text-sm transition-colors duration-150 ${isLogout
                ? 'text-red-600 hover:bg-red-50'
                : 'text-gray-700 hover:bg-gray-100'
                }`}
            onClick={onClick}
        >
            <i className={`${icon} text-lg mr-3`} />
            {label}
        </button>
    );
};
export default MenuItem;