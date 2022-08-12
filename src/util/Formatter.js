import moment from 'moment';

export const FormatAge = (dateValue) => {
    const ageFraction = moment().diff(moment(dateValue), 'years', true);
    return Math.floor(ageFraction);
}

export const FormatLongDate = (dateValue) => {
    if (dateValue === "" || dateValue === null || dateValue === undefined) return "";
    return moment(dateValue).format('MMM-DD-YYYY h:mm:ss a');
}

export const FormatDate = (dateValue, formatString) => {
    return moment(dateValue).format(formatString);
}


export const FormatShortDate = (dateValue) => {
    return moment(dateValue).format('DD-MM-YYYY');
}

export const FormatMonthYear = (dateValue) => {
    return moment(dateValue).format('MMM, YYYY');
}

export const ConvertDateToDays = (dateValue) => {
    return moment(dateValue).endOf('days').fromNow();
}

export const FormatLongDate2 = (dateValue) => {
    return moment(dateValue).format('MMMM Do, YYYY');
}

export const FormatTime = (dateValue) => {
    return moment(dateValue).format('h:mm:ss a');
}

export const CapitalizeFirstLetter = (str) => {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
}

// export const FormatNumber = (value) => {
//     const num = new Intl.NumberFormat('en-US', { style: 'number' }).format(value);
//     return num;
// }