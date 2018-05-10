var Seat = require('./Seat');

class Hall {

    // props = {id, name, seatList}
    constructor(hallObject) {
        for (var prop in hallObject) {
            this[prop] = prop == 'seatList' ? hallObject[prop].map(seatObject => new Seat(seatObject)) : hallObject[prop];
        }
    }

    // no use so far
    getSeats = () => {
        return this.seatList;
    }
}

module.exports = Hall;