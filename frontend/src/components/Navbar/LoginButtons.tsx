import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

type ButtonProps = {
    onClick?: () => void;
}

const LoginButtons: FC<ButtonProps> = ({ onClick }) => {
    const {t} = useTranslation();
    return (
        <>
            <button className="text-md font-medium text-blue-800 hover:text-blue-700 hover:cursor-pointer"
                onClick={onClick && onClick}>
                <Link to="/login">{t("login")}</Link>
            </button>
            <button className="bg-blue-800 text-white px-4 py-2 rounded-full text-md font-medium hover:bg-blue-700 hover:cursor-pointer"
                onClick={onClick && onClick}>
                <Link to="/signup">{t("signup")}</Link>
            </button>
        </>
    )
}
export default LoginButtons;