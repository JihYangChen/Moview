var Order = require('../entity/order/Order');
var STATUS = require('../entity/order/OrderStatusEnum');

class BookingController {

    constructor(cinemaManager, orderManager) {
        this.cinemaManager = cinemaManager;
        this.orderManager = orderManager;
    }

    selectShowing = (showingId) => {
        var showing = this.cinemaManager.getShowingById(showingId);
        return showing.getBookingProcessDisplayInfo();
    }

    determineBookingInfo = async (showingId, bookingInfo, memberId) => {
        var showing = this.cinemaManager.getShowingById(showingId);
        var order = this.createOrder(showing, bookingInfo);
        order.memberId = memberId;
        var orderId = await this.orderManager.saveOrder(order);
        await this.orderManager.addOrder(orderId);
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

    updateOrderStatusPaid = orderId => {
        this.orderManager.updateStatus(orderId, STATUS.Paid);
    }

    getOrdersInfo = memberId => {
        let orders = this.orderManager.getValidOrdersByMemberId(memberId);
        // todo, return some display info
    }

    cancelOrder = orderId => {
        this.orderManager.updateStatus(orderId, STATUS.Canceled);
    }

    // TMP create order here, can move whole method to Member until finish implementation
    createOrder = (showing, bookingInfo) => {
        var order = new Order(showing, bookingInfo);
        return order;
    }
}

module.exports = BookingController;