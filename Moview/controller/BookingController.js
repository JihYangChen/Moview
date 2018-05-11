var Order = require('../entity/order/Order');

class BookingController {

    constructor(cinemaManager, orderManager) {
        this.cinemaManager = cinemaManager;
        this.orderManager = orderManager;
    }

    selectShowing = (showingId) => {
        var showing = this.cinemaManager.getShowingById(showingId);
        return showing.getBookingProcessDisplayInfo();
    }

    determineBookingInfo = async (showingId, bookingInfo) => {
        var showing = this.cinemaManager.getShowingById(showingId);
        var order = this.createOrder(showing, bookingInfo);
        var orderId = await this.orderManager.saveOrder(order);
        await this.orderManager.addOrder(orderId);
        // make sure showing to be a same instance
        var showing = this.orderManager.getOrderById(orderId).showing;
        this.cinemaManager.replaceShowingInstance(showing);
        return {
            orderId: orderId,
            seats: showing.getNotOccupiedSeats()
        };
    }

    // seatNames = ["A1", "A2"]
    selectSeats = (orderId, seatNames) => {
        let order = this.orderManager.getOrderById(orderId);
        let showing = order.showing;

        // local update
        showing.setSeatsOccupied(seatNames);
        let seats = showing.getSeatsBySeatNames(seatNames);
        order.setSeats(seats);
        // remote update
        this.orderManager.updateTickets(order.getTicketObjects());
        let showingSeatObjects = showing.getShowingSeatObjects(seatNames);
        this.cinemaManager.updateShowingSeats(showingSeatObjects);
        return order.getConfirmDisplayInfos();
    }

    // TMP create order here, can move whole method to Member until finish implementation
    createOrder = (showing, bookingInfo) => {
        var order = new Order(showing, bookingInfo);
        return order;
    }
}

module.exports = BookingController;