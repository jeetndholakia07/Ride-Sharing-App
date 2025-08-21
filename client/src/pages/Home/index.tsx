import { Link } from "react-router";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-200 text-black">
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center h-100 text-center px-4 sm:px-6 lg:px-8">
                <h1 className="text-5xl font-bold leading-tight sm:text-6xl">
                    Welcome to
                    <span className="text-blue-700 ml-2">Peer</span>
                    <span className="text-green-700">Ride</span>
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-gray-800 max-w-2xl mx-auto">
                    The easiest way to get around, share your ride, or request a lift with a tap.
                </p>

                {/* Get Started Button */}
                <div className="mt-8">
                    <Link
                        to="/signup"
                        className="inline-block bg-yellow-500 text-gray-800 text-xl font-semibold py-3 px-6 rounded-lg hover:bg-yellow-600 transition duration-300"
                    >
                        Get Started
                    </Link>
                </div>
            </div>

            {/* Ride Options Section */}
            <div className="py-16 bg-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
                        Choose Your Ride
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {/* Share Ride Option (for Drivers) */}
                        <div className="flex flex-col items-center bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300">
                            <div className="bg-blue-500 text-white p-4 rounded-full mb-6">
                                <i className="bi bi-car-front text-3xl"></i>
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">Share a Ride</h3>
                            <p className="text-center text-gray-700 mb-6">
                                Share your ride and help others commute. Save money while
                                contributing to the environment.
                            </p>
                            <Link
                                to="/rides"
                                className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Become a Driver
                            </Link>
                        </div>

                        {/* Request Ride Option (for Passengers) */}
                        <div className="flex flex-col items-center bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300">
                            <div className="bg-green-500 text-white p-4 rounded-full mb-6">
                                <i className="bi bi-person-circle text-3xl"></i>
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">Request a Ride</h3>
                            <p className="text-center text-gray-700 mb-6">
                                Need a ride? Request a lift from drivers near you and get to
                                your destination safely and comfortably.
                            </p>
                            <Link
                                to="/rides"
                                className="inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300"
                            >
                                Request Ride
                            </Link>
                        </div>

                        {/* Ride Together Option */}
                        <div className="flex flex-col items-center bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300">
                            <div className="bg-purple-500 text-white p-4 rounded-full mb-6">
                                <i className="bi bi-people text-3xl"></i>
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">Ride Together</h3>
                            <p className="text-center text-gray-700 mb-6">
                                Find people going in the same direction and share your ride
                                together, reducing the cost and carbon footprint.
                            </p>
                            <Link
                                to="/rides"
                                className="inline-block bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-300"
                            >
                                Find a Ride
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;