import React from "react";
import RideCard from "./RideCard";

const RideList = ({ rides }: any) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {rides?.length === 0 ? (
                <p className="text-gray-600 col-span-full text-center">No rides available.</p>
            ) : (
                rides.map((ride: any) => <RideCard key={ride._id} ride={ride} />)
            )}
        </div>
    );
};

export default RideList;
