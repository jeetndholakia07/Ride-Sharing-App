import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

const Logo = () => {
    const { t } = useTranslation();
    return (
        <div className="flex-shrink-0 items-center">
            <NavLink to="/">
                <span className="text-2xl font-bold text-blue-700">{t("peer")}</span>
                <span className="text-2xl font-bold text-green-700">{t("ride")}</span>
            </NavLink>
        </div>
    )
}
export default Logo;