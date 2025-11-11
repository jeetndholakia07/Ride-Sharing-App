import { type FC } from "react";

type FuelTypeDisplayProps = {
  fuelType: "petrol" | "diesel" | "cng";
};

const FuelTypeDisplay: FC<FuelTypeDisplayProps> = ({ fuelType }) => {
  const icon =
    fuelType === "diesel"
      ? "bi-droplet"
      : fuelType === "cng"
        ? "bi-gas-pump"
        : "bi-fuel-pump";

  const color =
    fuelType === "diesel"
      ? "text-gray-500"
      : fuelType === "cng"
        ? "text-green-600"
        : "text-yellow-500";

  return (
    <div className="flex items-center justify-center space-x-1">
      <i className={`bi ${icon} text-lg ${color}`}></i>
      <span className="text-xs text-gray-600 capitalize">{fuelType}</span>
    </div>
  );
};

export default FuelTypeDisplay;
