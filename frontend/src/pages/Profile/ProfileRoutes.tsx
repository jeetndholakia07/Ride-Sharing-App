import { Route, Routes } from 'react-router-dom';
import UserProfile from './UserProfile';
import Notifications from './Notifications';
import ForgotPassword from './ForgetPassword';
import RideHistory from '../Profile/RideHistory';
import Layout from './Layout';

const ProfileRoutes = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<UserProfile />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/rides" element={<RideHistory />} />
            </Route>
        </Routes>
    )
}
export default ProfileRoutes;