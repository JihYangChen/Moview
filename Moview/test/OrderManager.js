var sinon = require('sinon');
var mongoose = require('mongoose');
require('sinon-mongoose');
var expect = require('chai').expect;
var OrderManager = require('../manager/OrderManager');
var Order = require('../entity/order/Order');
var Showing = require('../entity/cinema/Showing');
var order;
var showingObject;
let orderManager = new OrderManager();

describe('OrderManager', () => {
    beforeEach(() => {
        showingObject = { 
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
        order = new Order(null, '', orderObject);
        orderManager.orderList = [order];
    });

    it('should get showing correctly', () => {
        let showing = orderManager.getShowing([new Showing(null, showingObject)], 'showing001');
        expect(showing._id).to.equal('showing001');
        let nullShowing = orderManager.getShowing([new Showing(null, showingObject)], 'showing');
        expect(nullShowing).to.be.a('null');

    });

    it('should get order by id correctly', () => {
        let testee = orderManager.getOrderById('order001');
        expect(testee._id).to.equal('order001');
        expect(testee.status).to.equal('initialized');
        expect(testee.showing._id).to.equal('showing001');
        expect(testee.ticketList[0]._id).to.equal('ticket001');
        expect(testee.ticketList[0].seat._id).to.equal('seat001');
        expect(testee.ticketList[0].seat.getName()).to.equal('C5');
    });
});