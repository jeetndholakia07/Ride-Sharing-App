import type { FC } from "react";

type Props = {
    from: string;
    to: string;
    dropoff?: string;
    isPassenger?: boolean;
};

const Location: FC<Props> = ({ from, to, dropoff, isPassenger = false }) => {
    return (
        <div className="w-full text-gray-800">
            <div className="text-lg font-bold">{from} -</div>
            <div className="text-lg font-bold">{to}</div>
            {isPassenger && dropoff && (
                <div className="text-sm text-gray-500 italic mt-1">
                    Dropoff: {dropoff}
                </div>
            )}
        </div>
    );
};

export default Location;
