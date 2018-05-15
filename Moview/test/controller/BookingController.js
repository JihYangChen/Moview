var assert = require('assert');
var sinon = require('sinon');
var mongoose = require('mongoose');
require('sinon-mongoose');
var expect = require('chai').expect;
var BookingController = require('../../controller/BookingController');
var CinemaManager = require('../../manager/CinemaManager');
var OrderManager = require('../../manager/OrderManager');
var Showing = require('../../entity/cinema/Showing');
var Order = require('../../entity/order/Order');
let cinemaManager = new CinemaManager();
let orderManager = new OrderManager();
let bookingController;

describe('BookingController', () => {
    beforeEach(() => {
        var showingObject = { 
            _id: 'showing001',
            time: '1525752000',
            movie: {
                _id: 'movie001',
                name: 'DeadPool 2',
                movieDescription:
                { 
                    _id: 'descriptionId001',
                    coverUrl: 'http://coverUrl',
                    posterUrl: 'http://posterUrl',
                    casts: [ 
                        'Ryan Reynolds'
                    ],
                    directors: [ 'David Leitch' ],
                    categories: [ 'Action', 'Adventure', 'Comedy' ],
                    gallery: [ 'https://gallery' ],
                    trailers: [ 'https://trailers' ],
                    storyline: 'good story.',
                    releaseDate: '1000000000',
                    inTheater: true
                }
            },
            hall: {
                _id: 'hall001',
                name: 'hallName',
                seatList: [{
                    _id: 'seat001',
                    row: 'A',
                    column: '1',
                }, {
                    _id: 'seat002',
                    row: 'A',
                    column: '2',
                }]
            },
            showingSeatList: [{
                _id: 'showingSeat001',
                seat: { 
                    _id: 'seat001',
                    row: 'A',
                    column: '1'
                },
                isOccupied: false
            }, {
                _id: 'showingSeat002',
                seat: { 
                    _id: 'seat002',
                    row: 'A',
                    column: '2'
                },
                isOccupied: true
            }]
        };
        var showing = new Showing(null, showingObject);
        var orderObject = {
            _id: 'order001',
            status: 'initialized',
            showing: showingObject,
            ticketList: [{
                _id: 'ticket001',
                ticketCategory: 'Senior',
                date: 'Tue. May 08',
                time: '13:20',
                price: '$10.99',
                seat: {
                    _id: 'seat001',
                    row: 'C',
                    column: '5'
                }
            }]
        }
        var order = new Order(null, '', orderObject);
        cinemaManager.showingList = [showing];
        orderManager.orderList = [order];
        bookingController = new BookingController(cinemaManager, orderManager);
    });

    it('should return booking process display info after select showing', () => {
        let result = bookingController.selectShowing('showing001');
        expect(result.time).to.equal('Tue. May 08 at 12:00');
        expect(result.name).to.equal('DeadPool 2');
        expect(result.coverUrl).to.equal('http://coverUrl');
    });

    it('should return order id and seats after determine booking info', () => {
        var stub = sinon.stub(bookingController, 'determineBookingInfo').withArgs('showing001', {Adult: 1}).callsFake(() => {
            var showing = cinemaManager.getShowingById('showing001');
            var order = new Order(showing, {Adult: 1});
            order._id = 'newOrder001';
            orderManager.orderList = [order];
            showing = orderManager.getOrderById(order._id).showing;
            cinemaManager.replaceShowingInstance(showing);
            return {
                orderId: order._id,
                seats: showing.getNotOccupiedSeats()
            }
        });
        let result = bookingController.determineBookingInfo('showing001', {Adult: 1});
        expect(result.orderId).to.equal('newOrder001');
        expect(result.seats[0].row).to.equal('A');
        expect(result.seats[0].column).to.equal('1');
        bookingController.determineBookingInfo.restore();
    });

    it('should return confirm display infos after select seats', () => {
        var stub = sinon.stub(bookingController, 'selectSeats').withArgs('order001', ['B4']).callsFake(() => {
            let order = orderManager.getOrderById('order001');
            let showing = order.showing;
            // local update
            showing.setSeatsOccupied(['A1']);
            cinemaManager.replaceShowingInstance(showing);
            let seats = showing.getSeatsBySeatNames(['A1']);
            order.setSeats(seats);
            return order.getConfirmDisplayInfos();
        });
        expect(orderManager.orderList[0].showing.showingSeatList[0].isOccupied).to.be.false;
        expect(cinemaManager.showingList[0].showingSeatList[0].isOccupied).to.be.false;
        expect(orderManager.orderList[0].ticketList[0].seat.getName('C5'));

        let result = bookingController.selectSeats('order001', ['B4']);
        expect(result.ticketList[0].date).to.equal('Tue. May 08');
        expect(result.ticketList[0].time).to.equal('13:20');
        expect(result.ticketList[0].seat).to.equal('A1');
        expect(result.ticketList[0].price).to.equal('$10.99');
        expect(result.ticketList[0].ticketCategory).to.equal('Senior');
        // make sure same instance
        expect(orderManager.orderList[0].showing.showingSeatList[0].isOccupied).to.be.true;
        expect(cinemaManager.showingList[0].showingSeatList[0].isOccupied).to.be.true;
        expect(orderManager.orderList[0].ticketList[0].seat.getName('A1'));
    });
});