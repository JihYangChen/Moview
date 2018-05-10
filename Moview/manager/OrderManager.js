import { Mongoose } from 'mongoose';

var mongoose = require('mongoose');
var OrderModel = require('../mongoDB/model/order/OrderModel');
var TicketModel = require('../mongoDB/model/order/TicketModel');
var Order = require('../entity/order/Order');
require('../mongoDB/model/cinema/ShowingSeatModel');

class OrderManager {

    constructor() {
        this.init();
    }
    
    init = () => {
        this.orderList = [];
        this.generateOrderList();
    }

    // database operation

    generateOrderList = async () => {
        const orderObjects = await OrderModel.find();
        for (var orderObject of orderObjects) {
            this.pullOrderById(orderObject._id);
        }
        console.log('finish to load orders from database');
    }

    pullOrderById = async orderId => {
        const populatedOrderObject = await OrderModel.findById(orderId)
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

    saveOrder = async order => {
        var ticketObjects = order.getTicketObjects();
        var ticketIds = await this.insertTickets(ticketObjects);
        var orderObject = order.getOrderObject();
        orderObject.ticketList = ticketIds;
        return this.insertOrder(orderObject);
    }

    insertOrder = async orderObject => {
        const orderModel = new OrderModel(orderObject);
        const newOrder = await orderModel.save();
        console.log('> order has been inserted successfully');
        return newOrder._id;
    }

    insertTickets = async ticketObjects => {
        var ticketIds = [];
        for (var ticketObject of ticketObjects) {
            const ticketModel = new TicketModel(ticketObject);
            const newTicket = await ticketModel.save();
            ticketIds.push(newTicket._id);
        }
        console.log('> tickets have been inserted successfully');
        return ticketIds;
    }

    updateTickets = async ticketObjects => {
        for (var ticketObject of ticketObjects) {
            await TicketModel.findByIdAndUpdate(ticketObject._id, ticketObject).exec();
        }
        console.log('> tickets have been updated successfully');
    }

    // public 

    addOrder = orderId => {
        this.pullOrderById(orderId);
    }

    getOrderById = orderId => {
        let order = this.orderList.filter(order => {
            return order._id == orderId;
        });
        return order.length > 0 ? order[0] : null;
    }
}

module.exports = OrderManager;