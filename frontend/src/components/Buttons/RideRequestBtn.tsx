import type { FC } from "react";
import { useTranslation } from "react-i18next";

type props = {
    handleClick: any;
}

const RideRequestBtn: FC<props> = ({ handleClick }) => {
    const { t } = useTranslation();
    return (
        <button
            className="bg-green-600 text-white px-3 py-2 rounded-md hover:cursor-pointer hover:bg-green-700 font-medium focus:outline-none"
            onClick={handleClick}>
            <i className="bi bi-send-arrow-up text-white mr-1" />{t("rideRequest")}
        </button>
    )
}
export default RideRequestBtn;