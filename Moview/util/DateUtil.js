class DateUtil {

    // 18 May 2018
    static dateMonthYearFormattedString = timestamp => {
        var date = new Date(timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = date.getFullYear();
        var month = date.getMonth();
        var dt = date.getDate();
        return dt + " " + months[month] + " " + year;
    }

    // Jun 2,2018
    static occidentDateFormattedString = timestamp => {
        var date = new Date(timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = date.getFullYear();
        var month = date.getMonth();
        var dt = date.getDate();
        return months[month] + " " + dt + "," + year;
    }

    // Tue. May 08
    static dateFormattedString = timestamp => {
        var date = new Date(timestamp * 1000);
        var weekDay = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = date.getFullYear();
        var month = months[date.getMonth()];
        var dt = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return weekDay[date.getDay()] + " " + month + " " + dt;
    }
    
    // 05/08
    static simpleDateString = timestamp => {
        var date = new Date(timestamp * 1000);
        var month = date.getMonth() + 1;
        var displayMonth = month < 10 ? '0' + month : month;
        var dt = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return displayMonth + '/' + dt;
    }

    // 13:20
    static specificTimeFormattedString = timestamp => {
        var date = new Date(timestamp * 1000);
        var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        return hours + ":" + minutes;
    }
}

module.exports = DateUtil;