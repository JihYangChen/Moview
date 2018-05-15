var Ticket = require('./Ticket');
var Showing = require('../cinema/Showing');
var TicketSimpleFactory = require('./TicketSimpleFactory');

class Order {
    
    // props = {id, status, showing, ticketList}
    constructor(showing, bookingInfo, orderObject) {
        if (orderObject === undefined) {
            // creater order
            this.status = 'initialized';
            this.showing = showing;
            this.ticketList = this.generateTicketList(bookingInfo);
        } else {
            // create order by object
            for (var prop in orderObject) {
                if (prop == 'showing') {
                    this[prop] = showing == null ? new Showing(null, orderObject[prop]) : showing;
                } else if (prop == 'ticketList') {
                    this[prop] = orderObject[prop].map(ticketObject => new TicketSimpleFactory().createTicket(ticketObject.ticketCategory, '', ticketObject));
                } else {
                    this[prop] = orderObject[prop]
                }
            }
        }
    }

    /* {
        Adult: "3",
        Senior: "0",
        Child: "1",
    } */
    generateTicketList = bookingInfo => {
        var ticketList = [];
        for (var key of Object.keys(bookingInfo)) {
            if (bookingInfo[key] > 0) {
                for (var i = 0; i < bookingInfo[key]; i++) {
                    ticketList.push(new TicketSimpleFactory().createTicket(key, this.getShowingTimeInfo()));
                }
            }
        }
        return ticketList;
    }

    // for create ticket
    // note: seat is not included when this func being called
    getShowingTimeInfo = () => {
        return {
            date: this.showing.getDate(),
            time: this.showing.getSpecificTime()
        }
    }

    // public 

    // for insert order to db
    getOrderObject = () => {
        return {
            status: this.status,
            showing: this.showing._id
        }
    }

    // for insert ticket to db
    // note: seat is not included when this func being called
    getTicketObjects = () => {
        return this.ticketList.map(ticket => {
            let returnObject = {
                _id: ticket._id,
                date: ticket.date,
                time: ticket.time,
                price: ticket.price,
                ticketCategory: ticket.ticketCategory
            };
            if (ticket.seat !== undefined) {
                returnObject.seat = ticket.seat;
            }
            return returnObject;
        });
    }

    // set seats to tickets
    setSeats = seats => {
        for (const index of this.ticketList.keys()) {
            this.ticketList[index].seat = seats[index];
        }
    }

    getConfirmDisplayInfos = () => {
        return {
            ticketList: this.ticketList.map(ticket => {
                return {
                    date: ticket.date,
                    time: ticket.time,
                    seat: ticket.seat.getName(), 
                    price: ticket.price,
                    ticketCategory: ticket.ticketCategory
                }
            })
        }
    }
}

module.exports = Order;