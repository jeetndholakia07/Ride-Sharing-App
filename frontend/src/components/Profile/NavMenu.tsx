import { Link, useLocation } from 'react-router-dom';

const navItems = [
    { label: 'User Profile', path: '/profile', icon: 'bi bi-person-circle' },
    { label: 'Notifications', path: '/profile/notifications', icon: 'bi bi-bell' },
    { label: 'Forgot Password', path: '/profile/forgot-password', icon: 'bi bi-key' },
    { label: 'View Rides', path: '/profile/rides', icon: 'bi bi-car-front-fill' },
];

const SidebarNav = () => {
    const location = useLocation();

    return (
        <nav className="flex flex-col divide-y divide-gray-200">
        {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
                <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-5 py-4 text-sm font-medium transition ${
                        isActive
                            ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    <i className={`${item.icon} text-lg mr-3`} />
                    {item.label}
                </Link>
            );
        })}
    </nav>
    );
};

export default SidebarNav;