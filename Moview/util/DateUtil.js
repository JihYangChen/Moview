class DateUtil {

    static occidentDateFormattedString = timestamp => {
        var date = new Date(timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = date.getFullYear();
        var month = date.getMonth();
        var dt = date.getDate();
        return dt + " " + months[month] + " " + year;
    }

    static dateFormattedString = timestamp => {
        var date = new Date(timestamp * 1000);
        var year = date.getFullYear();
        var displayMonth = date.getMonth() + 1;
        var month = displayMonth < 10 ? '0' + displayMonth : displayMonth;
        var dt = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return year + "-" + month + "-" + dt;
    }

    static specificTimeFormattedString = timestamp => {
        var date = new Date(timestamp * 1000);
        var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        return hours + ":" + minutes;
    }
}

module.exports = DateUtil;