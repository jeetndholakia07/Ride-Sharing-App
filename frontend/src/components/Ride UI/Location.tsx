import type { FC } from "react";

type props = {
    from: string;
    to: string;
}

const Location: FC<props> = ({ from, to }) => {
    return (
        <div className="flex md:flex-nowrap flex-wrap items-center space-x-2">
            <span className="text-lg font-bold text-gray-800">{from}</span>
            <span className="text-gray-500 text-md font-bold"><i className="bi bi-arrow-right" /></span>
            <span className="text-lg font-bold text-gray-800">{to}</span>
        </div>
    )
}
export default Location;