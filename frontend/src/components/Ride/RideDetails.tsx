import { rideMap } from "../../utils/rideMapLocation";
import { getStatusColor, getStatusIcon, getVehicleIcon } from "../../utils/rideFormat";
import { formatDateTime } from "../../utils/dateFormat";
import { useLocation, useNavigate } from "react-router";
import NotFoundPage from "../../pages/Error/NotFound";
import { useTranslation } from "react-i18next";
import RideRequestBtn from "../Buttons/RideRequestBtn";

const RideDetails = () => {
  const location = useLocation();
  const data = location.state?.data;
  if (!data) {
    return <NotFoundPage />
  }
  const ride = rideMap(data);
  const vehicleIcon = getVehicleIcon(String(ride.vehicleType));
  const statusColor = getStatusColor(String(ride.driveStatus));
  const statusIcon = getStatusIcon(String(ride.driveStatus));
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200 mt-12">
      <button
        onClick={() => navigate(-1)}
        className="text-sm mb-4 md:mb-0 text-indigo-600 hover:underline hover:cursor-pointer"
      >
        {t("goback")}
      </button>
      {/* Header: From To + Time */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-700">
          {ride.from} {t("arrow")} {ride.to}
        </h1>
        <p className="mt-2 text-gray-700 font-bold text-sm md:text-base">
          <i className="bi bi-clock-fill mr-1" /> {t("departure")}  {formatDateTime(ride.departureTime)}
        </p>
      </div>

      {/* Vehicle Info + Status */}
      <div className="flex flex-col md:flex-row items-center md:justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={vehicleIcon}
            alt={String(ride.vehicleType)}
            className="h-[5rem] w-auto object-contain"
          />
          <div>
            <span className="text-xl font-semibold text-gray-800">
              {ride.vehicleName} {ride.vehicleNumber}
            </span>
            <p className="mt-1 text-gray-500">{ride.vehicleType}</p>
          </div>
        </div>

        <span
          className={`mt-2 md:mt-0 mb-2 inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${statusColor} bg-opacity-10`}
        >
          {statusIcon}
          <span className="ml-2">{ride.driveStatus}</span>
        </span>
      </div>

      <p className="text-center md:text-left mb-3">
        <span className="font-medium text-gray-800">{t("seatsAvailable")}</span>{" "}
        {ride.seatsAvailable}
      </p>
      <hr className="mb-4 border-gray-300" />

      {/* Driver + Seats + Note */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center space-x-6 flex-1">
          <img
            src={String(ride.driverProfileImg)}
            alt={String(ride.driverName)}
            className="w-20 h-20 rounded-full border-2 border-indigo-500 object-cover"
          />
          <div>
            <p className="text-xl font-semibold text-gray-800">{t("driver")} {ride.driverName}</p>
            <p className="text-gray-500 mt-1">Mobile: {ride.mobile}</p>
            {ride.driverRating && (
              <div className="mt-2 inline-flex items-center text-yellow-600 font-medium">
                <i className="bi bi-star-fill text-yellow-500" />
                <span className="ml-2"> {Number(ride.driverRating).toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-gray-700 space-y-2 mt-2">
        {ride.specialNote && (
          <p>
            <span className="font-medium text-gray-800">{t("note")}</span>{" "}
            {ride.specialNote}
          </p>
        )}
      </div>

      <div className="flex justify-end items-center mt-2">
        <RideRequestBtn />
      </div>
    </div>
  );
};

export default RideDetails;