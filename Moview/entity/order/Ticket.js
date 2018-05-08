
const TicketCategory = {
    Adult: "0",
    Senior: "1",
    Child: "2"
}

class Ticket {

    // props = {}
    constructor(ticketCategory, showingInfo) {
        this.ticketCategory = Object.keys(TicketCategory).find(key => TicketCategory[key] === ticketCategory);
        this.showingInfo = showingInfo;
    }
}

module.exports = Ticket;