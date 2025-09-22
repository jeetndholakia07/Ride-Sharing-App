import moment from "moment";

/* Convert Date String in "YYYY-MM-DD" fomat to "DD-MM-YYY" format */
const convertDateStringFormat = (dateString?: string) => {
    if (!dateString || typeof dateString !== 'string') return '';

    const parts = dateString.split("-");
    if (parts.length !== 3) return dateString; // return original if not in expected format
    // Split the input date string by the hyphen
    const [year, month, day] = dateString.split("-");
    const newDate = `${day}-${month}-${year}`;
    return newDate;
}

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

export { convertDateStringFormat, convertDateToString, getDateComponentsfromDateObj, getDateComponentsfromDateString };