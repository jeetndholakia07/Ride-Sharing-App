import { formatDate } from "../../utils/dateFormat";

type ReviewDisplayProps = {
    reviews: any;
    heading: string;
};

const ReviewDisplay: React.FC<ReviewDisplayProps> = ({ reviews, heading }) => {
    return (
        <div className="space-y-6 w-full max-w-2xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{heading}</h2>
            {reviews.map((review: any) => (
                <div
                    key={review.user.username}
                    className="flex items-start gap-4 p-4 bg-white shadow-sm rounded-lg border border-gray-100"
                >
                    {/* Profile Image */}
                    <img
                        src={review.user.profileImg}
                        alt={`${review.user.username}'s profile`}
                        className="w-12 h-12 rounded-full object-cover"
                    />

                    {/* Review Content */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-800">{review.user.username}</h3>
                            {review.createdAt && (
                                <span className="text-sm text-gray-400">{formatDate(review.createdAt)}</span>
                            )}
                        </div>

                        {/* Star Rating */}
                        <div className="flex mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <i
                                    key={star}
                                    className={`bi ${review.rating >= star
                                        ? 'bi-star-fill text-yellow-400'
                                        : 'bi-star text-gray-300'
                                        } text-sm`}
                                />
                            ))}
                        </div>

                        {/* Comment */}
                        <p className="text-gray-700">{review.review}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReviewDisplay;
