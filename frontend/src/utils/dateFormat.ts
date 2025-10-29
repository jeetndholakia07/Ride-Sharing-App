import moment from "moment";

const formatDateTime = (date: any) => {
    if (!date) return '';

    const momentDate = moment(date);
    if (!momentDate.isValid()) return '';

    return momentDate.format('DD-MM-YYYY hh:mm:ss A');
};

const formatDate = (date: any) => {
    if (!date) return '';

    const momentDate = moment(date);
    if (!momentDate.isValid()) return '';

    return momentDate.format('DD-MM-YYYY');
};

function mergeDateTime(date: Date | null, time: Date | null) {
    const dateFormatted = moment(date).format('YYYY-MM-DD');
    const timeFormatted = moment(time).format('HH:mm:ss');

    const dateTimeString = `${dateFormatted} ${timeFormatted}`;

    const mergedDate = moment(dateTimeString, 'YYYY-MM-DD HH:mm:ss').toDate();

    if (!moment(mergedDate).isValid()) {
        console.error('Invalid date:', mergedDate);
        return null;
    }

    return mergedDate;
};

/* Convert Date Object to "YYYY-MM-DD" fomat */
const convertDateToString = (dateObj: any) => {
    const newDate = moment(dateObj).format("YYYY-MM-DD");
    return newDate;
}

/* Get day,month,year from date string */
const getDateComponentsfromDateString = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return {
        day: day,
        month: month,
        year: year
    }
}

/* Get day,month,year from date object */
const getDateComponentsfromDateObj = (dateObj: any) => {
    const dateString = convertDateToString(dateObj);
    const dateComponents = getDateComponentsfromDateString(dateString);
    return dateComponents;
}

export { formatDateTime, formatDate, mergeDateTime, getDateComponentsfromDateObj };