import { Route, Routes } from 'react-router-dom';
import UserProfile from './UserProfile';
import Notifications from './Notifications';
import ForgotPassword from './ForgetPassword';
import UserRides from './UserRides';
import Layout from './Layout';
import ProfileNotFound from '../Error/NotFound';
import RideDisplay from '../Rides/RideDisplay';

const ProfileRoutes = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<UserProfile />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/forget-password" element={<ForgotPassword />} />
                <Route path="/rides" element={<UserRides />} />
                <Route path="/rides/:id" element={<RideDisplay />} />
                <Route path="*" element={<ProfileNotFound />} />
            </Route>
        </Routes>
    )
}
export default ProfileRoutes;