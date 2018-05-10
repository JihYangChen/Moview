var Ticket = require('./Ticket');
var Showing = require('../cinema/Showing');
var TicketSimpleFactory = require('./TicketSimpleFactory');

class Order {
    
    // props = {id, status, showing, ticketList}
    constructor(showing, bookingInfo, orderObject) {
        if (orderObject === undefined) {
            // creater order
            this.showing = showing;
            this.ticketList = this.generateTicketList(bookingInfo);
        } else {
            // create order by object
            for (var prop in orderObject) {
                if (prop == 'showing') {
                    this[prop] = new Showing(orderObject[prop]);
                } else if (prop == 'ticket') {
                    this[prop] = new TicketSimpleFactory().createTicket('', '', orderObject[prop]);
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
                    ticketList.push(new TicketSimpleFactory().createTicket(key, this.showing));
                }
            }
        }
        // if (bookingInfo["Adult"] > 0) {
        //     for (var i = 0; i < bookingInfo["Adult"]; i++) {
        //         ticketList.push(new TicketFactory.AdultTicketFactory(this.showing).createTicket());
        //     }
        // }
        // if (bookingInfo["Senior"] > 0) {
        //     for (var i = 0; i < bookingInfo["Senior"]; i++) {
        //         ticketList.push(new TicketFactory.SeniorTicketFactory(this.showing).createTicket());
        //     }
        // }
        // if (bookingInfo["Child"] > 0) {
        //     for (var i = 0; i < bookingInfo["Child"]; i++) {
        //         ticketList.push(new TicketFactory.ChildTicketFactory(this.showing).createTicket());
        //     }
        // }
        return ticketList;
    }
    
}

module.exports = Order;