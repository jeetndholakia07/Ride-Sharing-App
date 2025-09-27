const baseURL = "peerRide/api";

export const api = {
    signup: `${baseURL}/auth/registerUser`,
    login: `${baseURL}/auth/loginUser`,
    createReview: `${baseURL}/user/rating`,
    userReview: `${baseURL}/user/userRating`,
    allReviews: `${baseURL}/public/ratings`,
    allRides: `${baseURL}/public/rides`,
    userData: `${baseURL}/user/userData`,
    userProfile: `${baseURL}/user/userProfile`,
    profileImg: `${baseURL}/user/profileImage`,
    notifications: `${baseURL}/user/notifications`,
    ridesForRider: `${baseURL}/ride/ridesForRider`,
    ridesForDriver: `${baseURL}/ride/ridesForDriver`,
    createDrive: `${baseURL}/ride/drive`,
    createRide: `${baseURL}/ride/ride`,
    verifyUser: `${baseURL}/user/verifyUser`,
    updateProfileImg: `${baseURL}/user/profileImage`,
    updateProfile: `${baseURL}/user/userProfile`,
    readNotification: `${baseURL}/user/notificationRead`,
    cancelRide: `${baseURL}/ride/cancelRide`,
    acceptRide: `${baseURL}/ride/acceptRide`,
    rejectRide: `${baseURL}/ride/rejectRide`,
    completeRide: `${baseURL}/ride/completeRide`,
    updateDrive: `${baseURL}/ride/editDrive`,
    updatePassword: `${baseURL}/user/editPassword`
}