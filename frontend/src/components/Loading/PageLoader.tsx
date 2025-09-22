import { useTranslation } from "react-i18next";

const PageLoader = () => {
    const { t } = useTranslation();
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-black text-lg sm:text-xl md:text-2xl font-medium">
                    {t("loading")}
                </span>
            </div>
        </div>
    );
};

export default PageLoader;
