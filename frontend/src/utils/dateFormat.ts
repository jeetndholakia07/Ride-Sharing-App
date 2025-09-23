import moment from "moment";

const formatDateTime = (date: any) => {
    if (!date) return '';

    const momentDate = moment(date);
    if (!momentDate.isValid()) return '';

    return momentDate.format('DD-MM-YYYY hh:mm:ss A');
};


export { formatDateTime };