import { type FC } from "react";

type ACDisplayProps = {
    isAc: boolean;
};

const ACDisplay: FC<ACDisplayProps> = ({ isAc }) => {
    return (
        <div className="flex items-center justify-center space-x-1">
            <i
                className={`bi ${isAc ? "bi-snow" : "bi-sun"} text-lg ${isAc ? "text-blue-500" : "text-yellow-500"
                    }`}
            ></i>
            <span className="text-xs text-gray-600">
                {isAc ? "AC" : "Non-AC"}
            </span>
        </div>
    );
};

export default ACDisplay;
