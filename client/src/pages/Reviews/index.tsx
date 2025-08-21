import { useState } from 'react';
import CreateReview from './CreateReview';

const Index = () => {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviews, setReviews] = useState([
        {
            id: 1,
            rating: 5,
            review: "Great ride! The driver was very friendly and the car was clean.",
            username: "John Doe",
            userIcon: "bi-person-circle",
        },
        {
            id: 2,
            rating: 4,
            review: "Comfortable, but a little late. Overall a good experience.",
            username: "Jane Smith",
            userIcon: "bi-person-fill",
        },
        {
            id: 3,
            rating: 3,
            review: "The ride was okay, but the car could've been cleaner.",
            username: "Mark Taylor",
            userIcon: "bi-person-vcard",
        },
        {
            id: 4,
            rating: 5,
            review: "Excellent service! Will definitely use this ride-sharing app again.",
            username: "Emma Stone",
            userIcon: "bi-person-lines-fill",
        },
        {
            id: 5,
            rating: 4,
            review: "Smooth ride and polite driver. Could improve the app's interface.",
            username: "Chris Johnson",
            userIcon: "bi-person-fill-gear",
        },
        {
            id: 6,
            rating: 2,
            review: "The car was dirty, and the ride was uncomfortable.",
            username: "Lily Adams",
            userIcon: "bi-person-dash",
        },
    ]);

    // Function to add a new review
    const handleAddReview = (newReview: any) => {
        setReviews((prevReviews) => [
            ...prevReviews,
            { ...newReview, id: prevReviews.length + 1, username: 'Anonymous', userIcon: 'bi-person' },
        ]);
        setShowReviewForm(false); 
    };

    return (
        <div className="container mx-auto p-6 sm:p-8 md:p-10">
            <h1 className="text-3xl font-semibold text-center mb-6">Current Reviews</h1>

            <div className="text-center pt-4 pb-4 border-2 border-gray-300 rounded-lg bg-gray-50">
                <i className="bi bi-chat-square-quote text-4xl text-yellow-400 mb-4" />
                <p className="text-lg text-gray-600">No reviews yet. Be the first to share your experience!</p>
            </div>

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                            <div className="flex items-center space-x-3 mb-4">
                                <i className={`bi ${review.userIcon} text-3xl text-gray-500`} />
                                <span className="text-lg font-semibold text-gray-800">{review.username}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                {[...Array(5)].map((_, index) => (
                                    <i
                                        key={index}
                                        className={`bi bi-star-fill text-xl ${index < review.rating ? 'text-yellow-400' : 'text-gray-400'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-700">{review.review}</p>
                        </div>
                    ))}
                </div> */}

            <div className="mt-6 text-center">
                <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="bg-yellow-500 text-white hover:cursor-pointer py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
                >
                    {showReviewForm ? 'Cancel' : 'Create Review'}
                </button>
            </div>

            {showReviewForm && <CreateReview onAddReview={handleAddReview} />}
        </div>
    );
};

export default Index;