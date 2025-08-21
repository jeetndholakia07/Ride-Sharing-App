const services = [
    {
        title: "Ride Request",
        description: "Easily request rides to and from your campus with real-time availability.",
        iconClass: "bi-send",
    },
    {
        title: "Ride Share",
        description: "Offer your ride and split travel costs with fellow students securely.",
        iconClass: "bi-people",
    },
    {
        title: "Smart Ride Matching",
        description: "Smart matching system finds the best rides based on your preferences.",
        iconClass: "bi-diagram-3",
    },
    {
        title: "Navigation (Google Maps)",
        description: "Integrated Google Maps for real-time directions and ETA tracking.",
        iconClass: "bi-geo-alt",
    },
    {
        title: "Rating System",
        description: "Rate your co-riders and drivers to build trust and accountability.",
        iconClass: "bi bi-star-fill",
    },
    {
        title: "Real-time Chat",
        description: "Built-in messaging system to coordinate with ride partners instantly.",
        iconClass: "bi-chat-dots",
    },
];

const Index = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Our Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 text-center"
                        >
                            <div className="flex justify-center mb-4">
                                <i className={`bi ${service.iconClass} text-indigo-600 text-4xl`}></i>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                            <p className="text-gray-600 text-sm">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Index;