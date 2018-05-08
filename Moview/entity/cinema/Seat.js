class Seat {

    // props = {id, row, column}
    constructor(seatObject) {
        for (var prop in seatObject) {
            this[prop] = seatObject[prop];
        }
    }

    getName = () => {
        return this.row + this.column;
    }
}

module.exports = Seat;