import { useTranslation } from "react-i18next";
import { type FC } from "react";

type props = {
    handleClick: any;
}

const ReadMoreBtn: FC<props> = ({ handleClick }) => {
    const { t } = useTranslation();
    return (
        <button
            type="button"
            className="text-blue-600 hover:cursor-pointer hover:text-blue-800 font-medium focus:outline-none"
            onClick={handleClick}
        >
            {t("readMore")}
        </button>
    )
}
export default ReadMoreBtn;