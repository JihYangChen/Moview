var DateUtil = require('../../util/DateUtil');
var Movie = require('../Movie');
var Hall = require('./Hall');
var ShowingSeat = require('./ShowingSeat');

class Showing {

    // props = {id, time, movie, hall, showingSeatList}
    constructor (showingObject) {
        for (var prop in showingObject) {
            if (prop == 'movie') {
                this[prop] = new Movie(showingObject[prop]);
            } else if (prop == 'hall') {
                this[prop] = new Hall(showingObject[prop]);
            } else if (prop == 'showingSeatList') {
                this[prop] = showingObject[prop].map(showingSeatObject => new ShowingSeat(showingSeatObject));
            } else {
                this[prop] = showingObject[prop];
            }
        }
    }

    getDate = () => {
        return DateUtil.dateFormattedString(this.time);
    }

    getSpecificTime = () => {
        return DateUtil.specificTimeFormattedString(this.time);
    }

    getMovieName = () => {
        return this.movie.name;
    }

    getSeats = () => {
        return this.hall.getSeats();
    }

    // no use so far
    getShowingSeatBySeatName = name => {
        let showingSeat = this.showingSeatList.filter(showingSeat => {
            return showingSeat.seat.getName() == name;
        });
        return showingSeat.length > 0 ? showingSeat[0] : null;
    }
}

module.exports = Showing;