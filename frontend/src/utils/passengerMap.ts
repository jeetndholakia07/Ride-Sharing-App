type passengerDetails = {
    passengerId: string,
    username: string,
    mobile: string,
    collegeName: string
}

export const passengerMap = (data: passengerDetails): Record<string, string> => ({
    passengerId: data.passengerId,
    username: data.username,
    mobile: data.mobile,
    collegeName: data.collegeName
});