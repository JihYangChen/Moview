var sinon = require('sinon');
var mongoose = require('mongoose');
require('sinon-mongoose');
var expect = require('chai').expect;
var TicketSimpleFactory= require('../../entity/order/TicketSimpleFactory');

describe('Ticket entity', () => {
    it('should create Ticket correctly', () => {
        let adultTicket = new TicketSimpleFactory().createTicket('Adult', {
            date: 'Tue. May 08',
            time: '13:40'
        });
        let seniorTicket = new TicketSimpleFactory().createTicket('Senior', {
            date: 'Tue. May 09',
            time: '13:40'
        });
        let childTicket = new TicketSimpleFactory().createTicket('Child', {
            date: 'Tue. May 10',
            time: '13:40'
        });
        expect(adultTicket.ticketCategory).to.equal('Adult');
        expect(adultTicket.time).to.equal('13:40');
        expect(adultTicket.date).to.equal('Tue. May 08');
        expect(adultTicket.price).to.equal('12.99');
        expect(seniorTicket.ticketCategory).to.equal('Senior');
        expect(seniorTicket.time).to.equal('13:40');
        expect(seniorTicket.date).to.equal('Tue. May 09');
        expect(seniorTicket.price).to.equal('11.49');
        expect(childTicket.ticketCategory).to.equal('Child');
        expect(childTicket.time).to.equal('13:40');
        expect(childTicket.date).to.equal('Tue. May 10');
        expect(childTicket.price).to.equal('9.99');
    });

    it('should create Ticket by object correctly', () => {
        let adultTicketObject = {
            _id: 'ticket001',
            ticketCategory: 'Adult',
            date: 'Tue. May 08',
            time: '13:20',
            price: '12.99',
            seat: {
                _id: 'seat001',
                row: 'A',
                column: '1'
            }
        };
        let seniorTicketObject = {
            _id: 'ticket002',
            ticketCategory: 'Senior',
            date: 'Tue. May 08',
            time: '13:20',
            price: '11.49',
            seat: {
                _id: 'seat002',
                row: 'A',
                column: '2'
            }
        };
        let childTicketObject = {
            _id: 'ticket003',
            ticketCategory: 'Child',
            date: 'Tue. May 08',
            time: '13:20',
            price: '9.99',
            seat: {
                _id: 'seat003',
                row: 'A',
                column: '3'
            }
        };
        let adultTicket = new TicketSimpleFactory().createTicket('Adult', '', adultTicketObject);
        let seniorTicket = new TicketSimpleFactory().createTicket('Senior', '', seniorTicketObject);
        let childTicket = new TicketSimpleFactory().createTicket('Child', '', childTicketObject);
        expect(adultTicket._id).to.equal('ticket001');
        expect(adultTicket.ticketCategory).to.equal('Adult');
        expect(adultTicket.time).to.equal('13:20');
        expect(adultTicket.date).to.equal('Tue. May 08');
        expect(adultTicket.price).to.equal('12.99');
        expect(seniorTicket._id).to.equal('ticket002');
        expect(seniorTicket.ticketCategory).to.equal('Senior');
        expect(seniorTicket.time).to.equal('13:20');
        expect(seniorTicket.date).to.equal('Tue. May 08');
        expect(seniorTicket.price).to.equal('11.49');
        expect(childTicket._id).to.equal('ticket003');
        expect(childTicket.ticketCategory).to.equal('Child');
        expect(childTicket.time).to.equal('13:20');
        expect(childTicket.date).to.equal('Tue. May 08');
        expect(childTicket.price).to.equal('9.99');
    });
});