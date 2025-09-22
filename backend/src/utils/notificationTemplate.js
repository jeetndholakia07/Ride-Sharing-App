export const notificationTemplates = {
    rideRequested: ({ passengerName, from, to }) => ({
        heading: "New Ride Request",
        message: `${passengerName} has requested a ride from ${from} to ${to}. Please review and respond.`,
    }),

    rideAccepted: ({ driverName, from, to }) => ({
        heading: "Ride Request Accepted",
        message: `${driverName} has accepted your ride request from ${from} to ${to}. Get ready for your trip!`,
    }),

    rideRejected: ({ passengerName, from, to }) => ({
        heading: "Ride Request Rejected",
        message: `${passengerName} has rejected your ride request from ${from} to ${to}. We apologize for the inconvenience.`,
    }),

    rideCompleted: ({ driverName, from, to }) => ({
        heading: "Ride Completed",
        message: `Your ride journey with ${driverName} from ${from} to ${to} has been successfully completed. We hope you had a great experience!`,
    }),

    driveCancelled: ({ driverName, from, to }) => ({
        heading: "Drive Cancelled",
        message: `${driverName} has cancelled the ride from to ${to}. We apologize for the inconvenience.`,
    }),

    generic: ({ title, body }) => ({
        heading: title,
        message: body,
    }),
};