import moment from "moment";

export const slugify = (name) => {
    if (typeof name !== 'string') {
        return '';
    }
    return name.toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_|_$/g, "");
};

export const getDate = (date) => {
    if (!date) return '';

    const momentDate = moment(date);
    if (!momentDate.isValid()) return '';

    return momentDate.format('DD-MM-YYYY');
};

export const generateRideName = (from, to, date) => {
    return `Ride-${from}-${to}-${date}`;
}