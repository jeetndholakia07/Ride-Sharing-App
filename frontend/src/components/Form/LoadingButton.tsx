import React, { useRef } from 'react';

type ButtonProps = {
    name: string;
    disabled?: boolean;
    handleApi: any;
    isLoading: boolean;
    icon?: React.ReactNode;
    bgColor?: string;
    loadingBgColor?: string;
};

const LoadingButton: React.FC<ButtonProps> = ({
    name = "Submit", disabled, handleApi, isLoading = false, icon,
    bgColor = "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
    loadingBgColor = "bg-blue-400"
}) => {
    const btnRef = useRef<HTMLButtonElement | null>(null);

    const onClick = async (e: React.FormEvent) => {
        e.preventDefault();
        handleApi();
    };

    return (
        <button
            ref={btnRef}
            onClick={onClick}
            type="submit"
            disabled={disabled || isLoading}
            className={`relative hover:cursor-pointer inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white rounded-lg 
                ${isLoading ? `${loadingBgColor} cursor-wait` : `${bgColor}`} 
                disabled:bg-gray-300 disabled:cursor-not-allowed`}
        >
            {icon && icon}
            <span className={`${isLoading ? 'opacity-0' : 'opacity-100'}`}>{name}</span>
            {isLoading && (
                <span className="absolute inset-0 flex items-center justify-center text-xs text-white">
                    Please wait...
                    <i className="bi bi-arrow-clockwise animate-spin text-white" style={{ fontSize: '1.2rem' }}></i>
                </span>
            )}
        </button>
    );
};

export default LoadingButton;