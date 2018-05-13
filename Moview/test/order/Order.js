var sinon = require('sinon');
var mongoose = require('mongoose');
require('sinon-mongoose');
var expect = require('chai').expect;
var Order = require('../../entity/order/Order');
var Showing = require('../../entity/cinema/Showing');
var Seat = require('../../entity/cinema/Seat');
var order;
var orderObject;
var showing;

describe('Order entity', () => {
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
        orderObject = {
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
        showing = new Showing(null, showingObject);
        order = new Order(showing, {
            Adult: "3",
            Senior: "0",
            Child: "1",
        });
    });

    it('should create Order correctly', () => {
        expect(order.status).to.equal('initialized');
        expect(order.showing._id).to.equal('showing001');
        expect(order.ticketList).to.have.length(4);
        expect(order.ticketList[0].ticketCategory).to.equal('Adult');
        expect(order.ticketList[1].ticketCategory).to.equal('Adult');
        expect(order.ticketList[2].ticketCategory).to.equal('Adult');
        expect(order.ticketList[3].ticketCategory).to.equal('Child');
    });

    it('should create Order by object correctly', () => {
        order = new Order(null, '', orderObject);
        expect(order._id).to.equal('order001');
        expect(order.status).to.equal('initialized');
        expect(order.showing._id).to.equal('showing001');
        expect(order.ticketList).to.have.length(1);
        expect(order.ticketList[0].ticketCategory).to.equal('Senior');
        expect(order.ticketList[0].price).to.equal('$10.99');
        expect(order.ticketList[0].seat._id).to.equal('seat001');
        expect(order.ticketList[0].seat.getName()).to.equal('C5');
    });

    it('should generate ticketList correctly', () => {
        let ticketList = order.generateTicketList({
            Adult: "1",
            Senior: "1",
            Child: "1",
        });
        expect(ticketList).to.have.length(3);
        expect(ticketList[0].ticketCategory).to.equal('Adult');
        expect(ticketList[1].ticketCategory).to.equal('Senior');
        expect(ticketList[2].ticketCategory).to.equal('Child');
        expect(ticketList[0].date).to.equal('Tue. May 08');
        expect(ticketList[1].date).to.equal('Tue. May 08');
        expect(ticketList[2].date).to.equal('Tue. May 08');
        expect(ticketList[0].time).to.equal('12:00');
        expect(ticketList[1].time).to.equal('12:00');
        expect(ticketList[2].time).to.equal('12:00');
        expect(ticketList[0].ticketCategory).to.equal('Adult');
        expect(ticketList[1].ticketCategory).to.equal('Senior');
        expect(ticketList[2].ticketCategory).to.equal('Child');
    });

    it('should get showing time info correctly', () => {
        expect(order.getShowingTimeInfo().date).to.equal('Tue. May 08');
        expect(order.getShowingTimeInfo().time).to.equal('12:00');
    });

    it('should get order object correctly', () => {
        expect(order.getOrderObject().status).to.equal('initialized');
        expect(order.getOrderObject().showing).to.equal('showing001');
    });

    it('should get ticket objects correctly', () => {
        expect(order.getTicketObjects()[0].ticketCategory).to.equal('Adult');
        expect(order.getTicketObjects()[0].date).to.equal('Tue. May 08');
        expect(order.getTicketObjects()[0].time).to.equal('12:00');
        expect(order.getTicketObjects()[0].price).to.equal('$12.99');
        expect(order.getTicketObjects()[1].ticketCategory).to.equal('Adult');
        expect(order.getTicketObjects()[2].ticketCategory).to.equal('Adult');
        expect(order.getTicketObjects()[3].ticketCategory).to.equal('Child');
    });

    it('should set seats correctly', () => {
        let seat = new Seat({ 
            _id: 'seat001',
            row: 'A',
            column: '1'
        });
        let seat2 = new Seat({ 
            _id: 'seat002',
            row: 'A',
            column: '2'
        });
        let seat3 = new Seat({ 
            _id: 'seat003',
            row: 'A',
            column: '3'
        });
        let seat4 = new Seat({ 
            _id: 'seat004',
            row: 'A',
            column: '4'
        });
        let seats = [seat, seat2, seat3, seat4];
        order.setSeats(seats);
        expect(order.ticketList[0].seat._id).to.equal('seat001');
        expect(order.ticketList[0].seat.getName()).to.equal('A1');
        expect(order.ticketList[1].seat._id).to.equal('seat002');
        expect(order.ticketList[1].seat.getName()).to.equal('A2');
        expect(order.ticketList[2].seat._id).to.equal('seat003');
        expect(order.ticketList[2].seat.getName()).to.equal('A3');
        expect(order.ticketList[3].seat._id).to.equal('seat004');
        expect(order.ticketList[3].seat.getName()).to.equal('A4');
    });

    it('should get confirm display info correctly', () => {
        let seat = new Seat({ 
            _id: 'seat001',
            row: 'A',
            column: '1'
        });
        let seat2 = new Seat({ 
            _id: 'seat002',
            row: 'A',
            column: '2'
        });
        let seat3 = new Seat({ 
            _id: 'seat003',
            row: 'A',
            column: '3'
        });
        let seat4 = new Seat({ 
            _id: 'seat004',
            row: 'A',
            column: '4'
        });
        let seats = [seat, seat2, seat3, seat4];
        order.setSeats(seats);
        expect(order.getConfirmDisplayInfos().ticketList[0].seat).to.equal('A1');
        expect(order.getConfirmDisplayInfos().ticketList[1].seat).to.equal('A2');
        expect(order.getConfirmDisplayInfos().ticketList[2].seat).to.equal('A3');
        expect(order.getConfirmDisplayInfos().ticketList[3].seat).to.equal('A4');
        expect(order.getConfirmDisplayInfos().ticketList[0].ticketCategory).to.equal('Adult');
        expect(order.getConfirmDisplayInfos().ticketList[1].ticketCategory).to.equal('Adult');
        expect(order.getConfirmDisplayInfos().ticketList[2].ticketCategory).to.equal('Adult');
        expect(order.getConfirmDisplayInfos().ticketList[3].ticketCategory).to.equal('Child');
    });
});