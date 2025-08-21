import { useState, type FC } from 'react';

type props = {
    onAddReview: any
}

const ReviewPage: FC<props> = ({ onAddReview }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handle rating change
    const handleStarClick = (value: any) => {
        setRating(value);
    };

    // Handle review submission
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (rating === 0 || review === '') {
            alert("Please provide a rating and review.");
            return;
        }
        const newReview = { rating, review };
        onAddReview(newReview);
        setIsSubmitted(true);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center mb-6">Rate Your Ride</h2>

            {isSubmitted ? (
                <div className="text-center">
                    <h3 className="text-xl text-green-600">Thank you for your review!</h3>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="rating" className="block text-lg font-medium text-gray-700">Your Rating</label>
                        <div className="flex space-x-2 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <i
                                    key={star}
                                    className={`bi bi-star-fill cursor-pointer text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
                                    onClick={() => handleStarClick(star)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="review" className="block text-lg font-medium text-gray-700">Your Review</label>
                        <textarea
                            id="review"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            rows={4}
                            className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Write your review here..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full disabled:opacity-50 disabled:hover:cursor-not-allowed bg-yellow-500 hover:cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
                        disabled={review === "" || rating === 0}
                    >
                        Submit Review
                    </button>
                </form>
            )}
        </div>
    );
};

export default ReviewPage;