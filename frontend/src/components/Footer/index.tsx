import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const Index = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-100 text-gray-700">
      {/* Top Section: Quick Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Company Section */}
        <div>
          <h4 className="text-sm font-semibold uppercase mb-4">{t("company")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-black">{t("about")}</Link></li>
            <li><Link to="/reviews" className="hover:text-black">{t("reviews")}</Link></li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h4 className="text-sm font-semibold uppercase mb-4">{t("support")}</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-black">{t("helpCenter")}</a></li>
            <li><a href="#" className="hover:text-black">{t("contactUs")}</a></li>
          </ul>
        </div>

        {/* Explore Section */}
        <div>
          <h4 className="text-sm font-semibold uppercase mb-4">{t("explore")}</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-black">{t("offers")}</a></li>
            <li><Link to="/rides" className="hover:text-black">{t("rides")}</Link></li>
            <li><a href="#" className="hover:text-black">{t("becomeDriver")}</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section: Branding & Legal */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-sm">
          {/* Left: Branding */}
          <div className="mb-2 md:mb-0">
          {t("copyright")} {t("rightsReserved")} {new Date().getFullYear()}
          </div>

          {/* Right: Legal Links */}
          <div className="space-x-4">
            <a href="#" className="hover:text-black">{t("terms")}</a>
            <a href="#" className="hover:text-black">{t("privacy")}</a>
            <a href="#" className="hover:text-black">{t("cookies")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Index;
