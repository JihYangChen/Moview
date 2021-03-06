var Seat = require('./Seat');

class ShowingSeat {

    // props = {id, seat, isOccupied}
    constructor(showingSeatObject) {
        for (var prop in showingSeatObject) {
            this[prop] = prop == 'seat' ? new Seat(showingSeatObject[prop]) : showingSeatObject[prop];
        }
    }

    getShowingSeatObject = () => {
        return {
            _id: this._id,
            seat: this.seat._id,
            isOccupied: this.isOccupied
        }
    }
}

module.exports = ShowingSeat;