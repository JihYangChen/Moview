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

    // Tue. May 08
    getDate = () => {
        return DateUtil.dateFormattedString(this.time);
    }

    // 05/08
    getSimpleDate = () => {
        return DateUtil.simpleDateString(this.time);
    }

    // 13:20
    getSpecificTime = () => {
        return DateUtil.specificTimeFormattedString(this.time);
    }

    // Tue. May 08 at 13:20
    getTime = () => {
        return this.getDate() + " at " + this.getSpecificTime();
    }

    getBookingProcessDisplayInfo = () => {
        return {
            time: this.getTime(),
            movieName: this.movie.name,
            coverUrl: this.movie.coverUrl
        }
    }

    getMovieName = () => {
        return this.movie.name;
    }

    // for front-end
    getNotOccupiedSeats = () => {
        return this.showingSeatList.filter(showingSeat => {
            return !showingSeat.isOccupied
        }).map(showingSeat => {
            return {
                row: showingSeat.seat.row,
                column: showingSeat.seat.column
            }
        });
    }

    // no use so far
    getSeats = () => {
        return this.hall.getSeats();
    }

    getShowingSeatBySeatName = name => {
        let showingSeat = this.showingSeatList.filter(showingSeat => {
            return showingSeat.seat.getName() == name;
        });
        return showingSeat.length > 0 ? showingSeat[0] : null;
    }

    getSeatsBySeatNames = seatNames => {
        var showingSeats = [];
        for (var name of seatNames) {
            showingSeats.push(this.getShowingSeatBySeatName(name));
        }
        return showingSeats.map(showingSeat => {
            return showingSeat.seat;
        });
    }

    setSeatsOccupied = seatNames => {
        for (var name of seatNames) {
            let showingSeat = this.getShowingSeatBySeatName(name);
            showingSeat.isOccupied = true;
        }
    }

    getShowingSeatObjects = seatNames => {
        var showingSeats = [];
        for (var name of seatNames) {
            showingSeats.push(this.getShowingSeatBySeatName(name));
        }
        return showingSeats.map(showingSeat => {
            return showingSeat.getShowingSeatObject();
        });
    }
}

module.exports = Showing;