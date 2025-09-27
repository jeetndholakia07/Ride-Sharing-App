import { Routes, Route, Navigate } from 'react-router-dom';
import SidebarNav from './NavMenu';
import UserProfile from './UserProfile';
import Notifications from './Notifications';
import ForgotPassword from './ForgetPassword';
import RideHistory from './RideHistory';
import Breadcrumb from './Breadcrumb';

const ProfileRoutes = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-10 px-4">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">

                {/* Sidebar */}
                <aside className="w-full md:w-1/4">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden border-gray-200">
                        <SidebarNav />
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 w-full">
                    <div className="bg-white rounded-lg shadow-md px-6 py-6 min-h-[500px]">
                        <Breadcrumb />
                        <Routes>
                            <Route path="/" element={<UserProfile />} />
                            <Route path="notifications" element={<Notifications />} />
                            <Route path="forgot-password" element={<ForgotPassword />} />
                            <Route path="rides" element={<RideHistory />} />
                            <Route path="*" element={<Navigate to="/profile" />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProfileRoutes;
