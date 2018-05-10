var TicketFactory = require('./TicketFactory');

class TicketSimpleFactory {

    createTicket = (ticketCategory, showingInfo, ticketObject) => {
        if (ticketCategory == 'Adult') {
            return new TicketFactory.AdultTicketFactory(showingInfo, ticketObject).createTicket();
        } else if (ticketCategory == 'Senior') {
            return new TicketFactory.SeniorTicketFactory(showingInfo, ticketObject).createTicket();
        } else if (ticketCategory == 'Child') {
            return new TicketFactory.ChildTicketFactory(showingInfo, ticketObject).createTicket()
        }
        return null
    }
}

module.exports = TicketSimpleFactory;