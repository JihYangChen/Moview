var Ticket = require('./Ticket');
var Showing = require('../cinema/Showing');
var TicketSimpleFactory = require('./TicketSimpleFactory');
var STATUS = require('./OrderStatusEnum');

class Order {
    
    // props = {id, status, showing, ticketList}
    constructor(showing, bookingInfo, orderObject) {
        if (orderObject === undefined) {
            // creater order
            this.status = STATUS.Initialized;
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

    getSubtotal = () => {
        let subtotal = 0;
        for (let ticket of this.ticketList) 
            subtotal += parseFloat(ticket.price);
        return subtotal;
    }

    // public 

    // for insert order to db
    getOrderObject = () => {
        return {
            status: this.status,
            showing: this.showing._id,
            memberId: this.memberId
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

    getOrderInfo = () => {
        return {
            _id: this._id,
            movieId: this.showing.getBookingProcessDisplayInfo().movieId,
            movieName: this.showing.getBookingProcessDisplayInfo().name,
            showingDate: this.showing.getDate(),
            showingTime: this.showing.getSpecificTime(),
            status: this.status,
            ticketAmount: this.ticketList.length,
            subtotal: this.getSubtotal()
        }
    }

    getOrderDetailInfos = () => {
        return {
            _id: this._id,
            movieName: this.showing.getBookingProcessDisplayInfo().name,
            movieCoverUrl: this.showing.getBookingProcessDisplayInfo().coverUrl,
            showingCinema: "Regal Hudson Valley Mall 12",
            showingTime: this.showing.getTime(),
            subtotal: this.getSubtotal(),
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