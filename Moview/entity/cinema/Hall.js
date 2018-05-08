class Hall {

    // props = {id, name, seatList}
    constructor(hallObject) {
        for (var prop in hallObject) {
            this[prop] = hallObject[prop];
        }
    }

    getSeats = () => {
        return this.seatList;
    }
}

module.exports = Hall;