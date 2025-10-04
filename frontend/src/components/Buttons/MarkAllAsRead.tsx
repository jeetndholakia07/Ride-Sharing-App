import { type FC } from "react";
import { useTranslation } from "react-i18next";

type props = {
    handleClick: any;
}

const MarkAllAsRead: FC<props> = ({ handleClick }) => {
    const { t } = useTranslation();
    return (
        <button
            onClick={handleClick}
            className="flex items-center gap-2 hover:cursor-pointer bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition"
        >
            <i className="bi bi-check-all"></i>
            {t("markAllAsRead")}
        </button>
    )
}
export default MarkAllAsRead;