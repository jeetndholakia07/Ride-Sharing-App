import type { FC } from "react";
import { useTranslation } from "react-i18next";

type Props = {
    rating: number;
    review?: string;
    heading:string;
};

const ViewUserRating: FC<Props> = ({ rating, review, heading }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-start gap-2 mt-4 w-full">
            {/* Heading */}
            <h3 className="text-lg font-semibold text-gray-800">
                {heading}
            </h3>

            {/* Star Rating with number */}
            <div className="flex items-center gap-2">
                <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <i
                            key={star}
                            className={`bi ${rating >= star
                                    ? "bi-star-fill text-yellow-400"
                                    : "bi-star text-gray-300"
                                } text-lg transition-colors duration-200`}
                        />
                    ))}
                </div>
                <span className="ml-2 text-sm sm:text-base md:text-lg text-gray-600 font-medium">
                    ({rating.toFixed(1)})
                </span>
            </div>

            {/* Optional Review */}
            {review && (
                <p className="text-gray-700 text-sm sm:text-base md:text-base">
                    <strong>{t("comment")}:</strong> {review}
                </p>
            )}
        </div>
    );
};

export default ViewUserRating;
