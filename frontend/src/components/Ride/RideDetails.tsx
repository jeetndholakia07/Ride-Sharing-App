import { type FC } from "react";

type props = {
    ride: any;
}

const RideDetails: FC<props> = ({ ride }) => {
    const {
        vehicleType,
        driver,
        departureTime,
        from,
        to,
        status,
        mobile,
        additionalInfo,   // e.g. stops, fare breakdown, distance etc.
        carModel,
        carPlate,
      } = ride;
      
    return (
        <div className="mt-4 bg-gray-50 rounded-lg p-4">
        <h4 className="text-gray-700 font-semibold mb-2">Ride Details</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
          <div className="space-y-2">
            <p><strong>Vehicle Type:</strong> {vehicleType}</p>
            <p><strong>Car Model / Plate:</strong> {carModel} {carPlate && `(${carPlate})`}</p>
            <p><strong>Departure:</strong> {new Date(departureTime).toLocaleString()}</p>
            <p><strong>Route:</strong> {from} → {to}</p>
            <p><strong>Status:</strong> {status.charAt(0).toUpperCase() + status.slice(1)}</p>
          </div>
          <div className="space-y-2">
            <p><strong>Driver Contact:</strong> {driver.mobile}</p>
            <p><strong>Driver Rating:</strong> ⭐ {driver.rating?.toFixed(1) || "–"}</p>
            {additionalInfo && <p><strong>Info:</strong> {additionalInfo}</p>}
          </div>
        </div>
      </div>
    );
};

export default RideDetails;