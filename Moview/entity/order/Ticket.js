var Seat = require('../cinema/Seat');

const TicketPrice = {
    Adult: "$12.99",
    Senior: "$11.49",
    Child: "$9.99"
}

class Ticket {

    // props = {id, ticketCategory, date, time, price, seat}
    constructor(ticketCategory, showingInfo, ticketObject) {
        if (ticketObject === undefined) {
            // create ticket
            for (var prop in showingInfo) {
                this[prop] = showingInfo[prop];
            }
            this.ticketCategory = ticketCategory;
            this.price = TicketPrice[ticketCategory];
        } else {
            // create ticket by object
            for (var prop in ticketObject) {
                this[prop] = prop == 'seat' ? new Seat(ticketObject[prop]) : ticketObject[prop];
            }
        }
    }
}

class AdultTicket extends Ticket {

    constructor(showingInfo, ticketObject) {
        super('Adult', showingInfo, ticketObject);
    }
}

class SeniorTicket extends Ticket {

    constructor(showingInfo, ticketObject) {
        super('Senior', showingInfo, ticketObject);
    }
}

class ChildTicket extends Ticket {

    constructor(showingInfo, ticketObject) {
        super('Child', showingInfo, ticketObject);
    }
}

module.exports = { Ticket, AdultTicket, SeniorTicket, ChildTicket};