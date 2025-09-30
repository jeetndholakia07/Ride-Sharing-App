import { useTranslation } from "react-i18next"

const RideRequestBtn = () => {
    const { t } = useTranslation();
    return (
        <button
            className="bg-green-600 text-white px-3 py-2 rounded-md hover:cursor-pointer hover:bg-green-700 font-medium focus:outline-none"
        >
            <i className="bi bi-send-arrow-up text-white mr-1" />{t("rideRequest")}
        </button>
    )
}
export default RideRequestBtn;