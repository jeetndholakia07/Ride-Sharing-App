import { useState } from "react";
import { useTranslation } from "react-i18next";
import CreateReview from "./CreateReview";

const AddReview = () => {
    const [showReview, setShowReview] = useState(false);
    const { t } = useTranslation();
    return (
        <>
            <div className="flex items-center justify-between max-w-2xl mx-auto mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{t("reviews")}</h2>
                <button
                    onClick={() => setShowReview((prev) => !prev)}
                    className={`${showReview ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"} 
                    transition text-white px-4 py-2 rounded-full hover:cursor-pointer text-sm "`}>
                    <i className={`bi ${showReview ? "bi-x-lg" : "bi-plus-lg "} mr-2 text-md`} />{showReview ? t("cancel") : t("addReview")}
                </button>
            </div>
            {showReview && <CreateReview />}
        </>
    )
}
export default AddReview;