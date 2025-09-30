import { type FC } from 'react';

type loadingProps = {
    text?: string;
}

const LoadingOverlay: FC<loadingProps> = ({ text = "Loading..." }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm dark:bg-black/50">
            <div className="relative flex items-center justify-center w-32 h-32">
                <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 animate-pulse">
                    {text}
                </span>
            </div>
        </div>
    );
};

export default LoadingOverlay;