var mongoose = require('mongoose');
var OrderModel = require('../mongoDB/model/order/OrderModel');
var TicketModel = require('../mongoDB/model/order/TicketModel');
var SeatModel = require('../mongoDB/model/cinema/SeatModel');
var Order = require('../entity/order/Order');
require('../mongoDB/model/cinema/ShowingSeatModel');
// var Showing = require('../entity/cinema/Showing');

class OrderManager {

    constructor() {
        this.init();
    }
    
    init = () => {
        this.orderList = [];
        this.generateOrderList();
    }

    generateOrderList = async () => {
        const orderObjects = await OrderModel.find();
        for (var orderObject of orderObjects) {
            const populatedOrderObject = await OrderModel.findById(orderObject._id)
                                                         .populate({
                                                             path: 'showing',
                                                             populate: [{
                                                                 path: 'showingSeatList',
                                                                 populate: [{
                                                                     path: 'showingSeat'
                                                                 }, {
                                                                     path: 'seat'
                                                                 }]
                                                             }, {
                                                                 path: 'movie',
                                                                 populate: {
                                                                     path: 'movieDescription'
                                                                 }
                                                             }, {
                                                                 path: 'hall',
                                                                 populate: {
                                                                     path: 'seatList',
                                                                     populate: {
                                                                         path: 'seat'
                                                                     }
                                                                 }
                                                             }]
                                                         })
                                                         .populate({
                                                             path: 'ticketList',
                                                             populate: [{
                                                                 path: 'ticket'
                                                             }, {
                                                                 path: 'seat'
                                                             }]
                                                         })
                                                         .exec();
            this.orderList.push(new Order('', '', populatedOrderObject));
        }
        console.log('finish to load orders from database');
    }
}

module.exports = OrderManager;