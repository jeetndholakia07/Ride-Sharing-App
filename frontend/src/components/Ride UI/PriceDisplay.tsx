import { type FC } from "react";

type PricePerPersonProps = {
    price: number;
};

const PriceDisplay: FC<PricePerPersonProps> = ({ price }) => {
    return (
        <div className="mt-2 flex items-baseline md:justify-start justify-center text-gray-800">
            <span className="text-green-600 font-semibold text-lg mr-1">₹</span>
            <span className="text-lg font-medium">{price?.toLocaleString("en-IN")}</span>
            <span className="text-sm text-gray-500 ml-1">/person</span>
        </div>
    );
};

export default PriceDisplay;
