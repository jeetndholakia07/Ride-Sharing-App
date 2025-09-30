import React from "react";

type NotFoundProps = {
    title?: string;
    message?: string;
    icon?: React.ReactNode;
};

const ProfileNotFound: React.FC<NotFoundProps> = ({
    title = "Not Found",
    message = "We couldn't find what you're looking for.",
    icon,
}) => {
    return (
        <div className="flex flex-col items-center justify-center text-center px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-4 text-blue-500 text-5xl">
                {icon || <i className="bi bi-search" aria-hidden="true"></i>}
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{title}</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{message}</p>
        </div>
    );
};

export default ProfileNotFound;