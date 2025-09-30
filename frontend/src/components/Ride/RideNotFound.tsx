import { type FC } from "react";
import { useTranslation } from "react-i18next";

const RideNotFound: FC = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center justify-center min-h-[2rem] text-center text-gray-600">
            <img
                src="/assets/images/rideNotFound.png"
                alt={t("noRides")}
                className="w-[5rem] h-[5rem] mb-4 opacity-80"
            />
            <h2 className="text-xl font-semibold">{t("noRides")}</h2>
            <p className="mt-2 text-sm text-gray-500">
                {t("adjustSearch")}
            </p>
        </div>
    );
};

export default RideNotFound;
