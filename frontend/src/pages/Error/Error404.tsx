import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Error404Page = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center">
        <i className="bi bi-exclamation-triangle text-6xl text-yellow-500 mb-4"></i>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">{t("serviceunavailable")}</h1>
        <p className="text-xl text-gray-600 mb-6">
          {t("pageNotExists")}
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg text-lg transition"
        >
          {t("returnHome")}
        </Link>
      </div>
    </div>
  );
};

export default Error404Page;
