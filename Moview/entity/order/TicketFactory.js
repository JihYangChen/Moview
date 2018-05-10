var Ticket = require('./Ticket');

class TicketFactory {

    constructor(showingInfo, ticketObject) {
        if (ticketObject === undefined) {
            this.showingInfo = showingInfo;
        } else {
            this.ticketObject = ticketObject;
        }
    }

    createTicket = showingInfo => {
        // abstract method
    }

    generateTicket = () => {
        return this.createTicket();
    }
}

class AdultTicketFactory extends TicketFactory {

    constructor(showingInfo, ticketObject) {
        super(showingInfo, ticketObject);
    }

    createTicket = () => {
        return new Ticket.AdultTicket(this.showingInfo, this.ticketObject);
    }
}

class SeniorTicketFactory extends TicketFactory {

    constructor(showingInfo, ticketObject) {
        super(showingInfo, ticketObject);
    }

    createTicket = () => {
        return new Ticket.SeniorTicket(this.showingInfo, this.ticketObject);
    }
}

class ChildTicketFactory extends TicketFactory {

    constructor(showingInfo, ticketObject) {
        super(showingInfo, ticketObject);
    }

    createTicket = () => {
        return new Ticket.ChildTicket(this.showingInfo, this.ticketObject);
    }
}

module.exports = { TicketFactory, AdultTicketFactory, SeniorTicketFactory, ChildTicketFactory };

