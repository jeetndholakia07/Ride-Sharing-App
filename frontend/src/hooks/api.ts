const baseURL = "peerRide/api";
const publicURL = `${baseURL}/public`;
const rideURL = `${baseURL}/ride`;
const userURL = `${baseURL}/user`;
const authURL = `${baseURL}/auth`;

export const api = {
    auth: {
        signup: `${authURL}/registerUser`,
        login: `${authURL}/loginUser`,
    },
    user: {
        userData: `${userURL}/userData`,
        userProfile: `${userURL}/userProfile`,
        profileImg: `${userURL}/profileImage`,
        notifications: `${userURL}/notifications`,
        createReview: `${userURL}/rating`,
        userReview: `${userURL}/userRating`,
        verifyUser: `${userURL}/verifyUser`,
        updateProfileImg: `${userURL}/profileImage`,
        updateProfile: `${userURL}/userProfile`,
        readNotification: `${userURL}/notificationRead`,
        forgetPassword: `${userURL}/editPassword`
    },
    ride: {
        ridesForRider: `${rideURL}/ridesForRider`,
        ridesForDriver: `${rideURL}/ridesForDriver`,
        createDrive: `${rideURL}/drive`,
        createRide: `${rideURL}/ride`,
        cancelRide: `${rideURL}/cancelRide`,
        acceptRide: `${rideURL}/acceptRide`,
        rejectRide: `${rideURL}/rejectRide`,
        completeRide: `${rideURL}/completeRide`,
        updateDrive: `${rideURL}/editDrive`,
    },
    public: {
        allReviews: `${publicURL}/ratings`,
        allRides: `${publicURL}/rides`,
    }
}