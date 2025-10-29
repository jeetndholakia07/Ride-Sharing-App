import type { FC } from "react";
import { useTranslation } from "react-i18next";

type props = {
    driverName: string;
}

const DriverName: FC<props> = ({ driverName }) => {
    const { t } = useTranslation();
    return (
        <p className="text-gray-800 font-semibold">{t("driver")} {driverName}</p>
    )
}
export default DriverName;