import type { FC } from "react";
import { useTranslation } from "react-i18next";

type props = {
    seats: number;
    isLeft?: boolean;
}

const Seats: FC<props> = ({ seats, isLeft = false }) => {
    const { t } = useTranslation();

    return (
        <div className="md:text-right text-center md:mr-5 mb-2 min-w-max whitespace-nowrap text-gray-500 text-sm font-bold">
            <p className="text-gray-500 whitespace-nowrap text-sm">
                {seats} {t("seat")}{seats > 1 ? "s" : ""} {isLeft && t("left")}
            </p>
        </div>
    )
}

export default Seats;
