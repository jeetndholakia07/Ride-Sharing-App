const baseURL = "peerRide/api";
const publicURL = `${baseURL}/public`;
const rideURL = `${baseURL}/ride`;
const userURL = `${baseURL}/user`;
const authURL = `${baseURL}/auth`;
const chatURL = `${baseURL}/chat`;

export const api = {
    auth: {
        signup: `${authURL}/register-user`,
        login: `${authURL}/login-user`,
        validateUser: `${authURL}/validate-user`,
        logoutUser: `${authURL}/logout-user`
    },
    user: {
        userProfile: `${userURL}/userProfile`,
        profileImg: `${userURL}/profileImage`,
        notifications: `${userURL}/notifications`,
        createReview: `${userURL}/rating`,
        userReview: `${userURL}/userRating`,
        verifyUser: `${userURL}/verifyUser`,
        updateProfileImg: `${userURL}/profileImage`,
        updateProfile: `${userURL}/userProfile`,
        markNotificationRead: `${userURL}/markNotificationRead`,
        editCollegeID: `${userURL}/editCollegeID`,
        forgetPassword: `${userURL}/editPassword`,
        resetProfileImg: `${userURL}/resetProfileImg`,
        markAllNotificationRead: `${userURL}/markAllNotificationRead`,
        notificationCount: `${userURL}/notificationCount`,
        editReview: `${userURL}/editReview`
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
        checkRide: `${rideURL}/checkRide`,
        rideById: `${rideURL}/ride`,
        driveById: `${rideURL}/drive`,
        addDriverRating: `${rideURL}/addDriverRating`,
        saveVehicle: `${rideURL}/vehicle`,
        getVehicle: `${rideURL}/vehicle`
    },
    public: {
        allReviews: `${publicURL}/ratings`,
        allRides: `${publicURL}/rides`,
        frequentRides: `${publicURL}/frequent-rides`,
        autoComplete: `${publicURL}/auto-complete`,
        ridePrice: `${publicURL}/ride-price`
    },
    chat: {
        userChats: `${chatURL}/user-chats`,
        userChat: `${chatURL}/user-chat`,
        messages: `${chatURL}/messages`,
        totalUnreadCount: `${chatURL}/totalUnreadCount`,
        room: `${chatURL}/room`
    }
}