const Index = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-6 w-auto sm:px-12 lg:px-24">
            <div className="max-w-5xl mx-auto">
                {/* Company Intro */}
                <section className="mb-16 text-center">
                    <h1 className="text-5xl font-extrabold mb-6">Welcome to
                        <span className="text-blue-700 ml-2">Peer</span>
                        <span className="text-green-700">Ride</span>
                    </h1>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        PeerRide is a student-centric ride-sharing platform built to make campus travel smarter, safer, and more affordable. We connect college students with rides tailored to their schedules and preferences — powered by smart matching algorithms and real-time communication.
                    </p>
                </section>

                {/* Our Goals */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">Our Goals</h2>
                    <ul className="max-w-3xl mx-auto space-y-4 text-gray-700 text-lg list-disc list-inside">
                        <li>Reduce campus traffic and carbon footprint through efficient ride-sharing.</li>
                        <li>Foster a community of trust and cooperation among college students.</li>
                        <li>Leverage AI-powered matching to provide the best ride options quickly.</li>
                        <li>Provide seamless navigation and communication features integrated within the app.</li>
                    </ul>
                </section>

                {/* Our Services / Aims */}
                <section>
                    <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">What We Offer</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
                            <h3 className="text-xl font-bold mb-2 text-green-700">Smart Ride Matching</h3>
                            <p className="text-gray-700">
                                Our advanced machine learning algorithm connects riders and drivers efficiently, saving time and money.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
                            <h3 className="text-xl font-bold mb-2 text-green-700">Real-Time Navigation</h3>
                            <p className="text-gray-700">
                                Integrated Maps navigation helps you reach your destination safely with live ETA and route updates.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
                            <h3 className="text-xl font-bold mb-2 text-green-700">Secure Ride Sharing</h3>
                            <p className="text-gray-700">
                                Communicate directly with your ride partners and rate your experience to maintain a trusted community.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Index;  