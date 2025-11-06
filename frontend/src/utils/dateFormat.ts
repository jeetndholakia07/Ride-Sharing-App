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
};

/* For chats component */
const formatMessageDate = (dateString: string | Date) => {
    const date = moment(dateString);
    if (date.isSame(moment(), "day")) return date.format("h:mm A"); // Today
    if (date.isSame(moment().subtract(1, "days"), "day")) return `Yesterday ${date.format("h:mm A")}`;
    return date.format("MMM D, h:mm A"); // Older dates
};

/* For chat window */
const groupMessagesByDay = (messages: any[]) => {
    const groups: { [key: string]: any[] } = {};
    messages.forEach((msg) => {
        const date = moment(msg.createdAt);
        let key: string;
        if (date.isSame(moment(), "day")) key = "Today";
        else if (date.isSame(moment().subtract(1, "day"), "day")) key = "Yesterday";
        else key = date.format("dddd, MMM D");
        if (!groups[key]) groups[key] = [];
        groups[key].push(msg);
    });
    return groups;
};

const formatMsgTimestamp = (createdAt: any) => {
    return new Date(createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export {
    formatDateTime, formatDate, mergeDateTime, getDateComponentsfromDateObj,
    formatMessageDate, groupMessagesByDay, formatMsgTimestamp
};