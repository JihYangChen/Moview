var DateUtil = require('../../util/DateUtil');
var Movie = require('../Movie');
var Hall = require('./Hall');

class Showing {

    // props = {id, time, movie, hall}
    constructor (showingObject) {
        for (var prop in showingObject) {
            if (prop == 'movie') {
                this[prop] = new Movie(showingObject[prop]);
            } else if (prop == 'hall') {
                this[prop] = new Hall(showingObject[prop]);
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
}

module.exports = Showing;