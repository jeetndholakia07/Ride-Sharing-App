import { useTranslation } from "react-i18next";

const NotFoundReview = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full flex items-center space-x-4">
        <div className="flex-shrink-0 bg-gray-100 p-4 rounded-full">
          <i className="bi bi-chat-left-dots text-3xl text-gray-400"></i>
        </div>
        <div className="text-left">
          <h3 className="text-lg font-semibold text-gray-800">
            {t("noReviewsFound")}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {t("reviewQuote")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundReview;