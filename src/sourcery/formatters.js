
import moment from 'moment';
import numeral from 'numeral';

export const GetUnixTime = () => {
    return moment().unix();
}

export const FormatMoney = (numberValue) => {
    return numeral(numberValue).format('0,0.00');
}

export const FormatAge = (dateValue) => {
    const ageFraction = moment().diff(moment(dateValue), 'years', true);
    return Math.floor(ageFraction);
}

export const FormatLongDate = (dateValue) => {
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

export const formatter = {  
    toCurrency(amount, currency) {
        if (typeof amount !== "number") {
            return amount;
        }
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        });
        return formatter.format(amount);
    },
};
