import { type FC } from "react";

type Props = {
    rides: any;
    setFieldValue: any;
};

const FrequentRides: FC<Props> = ({ rides, setFieldValue }) => {
    const handleClick = (ride: any) => {
        setFieldValue("from", ride.from.address);
        setFieldValue("to", ride.to.address);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-4 mb-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {rides.map((ride: any, index: any) => {
                    return (
                        <div
                            key={index}
                            onClick={() => handleClick(ride)}
                            className={`group relative rounded-xl overflow-hidden transition-all duration-300 border cursor-pointer
            bg-gray-50 border-gray-200 hover:border-blue-400 hover:shadow-md`}
                        >
                            <div className="flex flex-col justify-center items-center py-2">
                                {/* Ride Info */}
                                <h3 className="text-xs font-medium text-gray-800 text-center">
                                    {ride.from.address}{" "}
                                    <i className="bi bi-arrow-right mx-1 text-xs text-gray-500" />{" "}
                                    {ride.to.address}
                                </h3>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FrequentRides;
