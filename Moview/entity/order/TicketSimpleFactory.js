var TicketFactory = require('./TicketFactory');

class TicketSimpleFactory {

    createTicket = (ticketCategory, showing, ticketObject) => {
        if (ticketCategory == 'Adult') {
            return new TicketFactory.AdultTicketFactory(this.showing, ticketObject).createTicket();
        } else if (ticketCategory == 'Senior') {
            return new TicketFactory.SeniorTicketFactory(this.showing, ticketObject).createTicket();
        } else if (ticketCategory == 'Child') {
            return new TicketFactory.ChildTicketFactory(this.showing, ticketObject).createTicket()
        }
        return null
    }
}

module.exports = TicketSimpleFactory;