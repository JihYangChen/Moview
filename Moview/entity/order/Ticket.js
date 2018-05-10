var Seat = require('../cinema/Seat');

const TicketPrice = {
    Adult: "$12.99",
    Senior: "$11.49",
    Child: "$9.99"
}

class Ticket {

    // props = {}
    constructor(ticketCategory, showingInfo, ticketObject) {
        if (ticketObject === undefined) {
            // create ticket
            this.ticketCategory = ticketCategory;
            this.showingInfo = showingInfo;
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
        this.price = TicketPrice['Adult'];
    }
}

class SeniorTicket extends Ticket {

    constructor(showingInfo, ticketObject) {
        super('Senior', showingInfo, ticketObject);
        this.price = TicketPrice['Senior'];
    }
}

class ChildTicket extends Ticket {

    constructor(showingInfo, ticketObject) {
        super('Child', showingInfo, ticketObject);
        this.price = TicketPrice['Child'];
    }
}

module.exports = { Ticket, AdultTicket, SeniorTicket, ChildTicket};