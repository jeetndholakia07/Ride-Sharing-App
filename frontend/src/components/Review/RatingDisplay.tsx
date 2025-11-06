import type { FC } from "react";
import { useTranslation } from "react-i18next";

type props = {
    rating: number;
    review: string;
}

const RatingDisplay: FC<props> = ({ rating, review }) => {
    const { t } = useTranslation();
    return (
        <div className="mt-2 flex flex-col items-start">
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <i
                        key={star}
                        className={`bi ${rating >= star
                            ? "bi-star-fill text-yellow-400"
                            : "bi-star text-gray-300"
                            } text-sm`}
                    />
                ))}
                <span className="ml-1 text-gray-600 text-sm">
                    ({rating.toFixed(1)})
                </span>
            </div>
            {review && (
                <p className="text-gray-700 text-sm mt-1">
                    <strong>{t("comment")}:</strong> {review}
                </p>
            )}
        </div>
    )
}
export default RatingDisplay;