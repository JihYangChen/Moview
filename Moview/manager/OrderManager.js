import { Mongoose } from 'mongoose';

var mongoose = require('mongoose');
var OrderModel = require('../mongoDB/model/order/OrderModel');
var TicketModel = require('../mongoDB/model/order/TicketModel');
var Order = require('../entity/order/Order');
require('../mongoDB/model/cinema/ShowingSeatModel');

class OrderManager {

    constructor() {

    }
    
    init = showings => {
        this.orderList = [];
        this.generateOrderList(showings);
    }

    // database operation

    generateOrderList = async showings => {
        const orderObjects = await OrderModel.find();
        for (var orderObject of orderObjects) {
            await this.pullOrderById(orderObject._id, showings);
        }
        console.log('finish to load orders from database');
    }

    pullOrderById = async (orderId, showings) => {
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
        this.orderList.push(new Order(showings == null ? null : this.getShowing(showings, populatedOrderObject.showing._id), '', populatedOrderObject));
    }

    getShowing = (showings, targetShowingId) => {
        let showingsArray = showings.filter(showing => {
            return JSON.stringify(showing._id) == JSON.stringify(targetShowingId);
        });
        return showingsArray.length > 0 ? showingsArray[0] : null;
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

    /***********************************
     * 
     *  please be very careful !!!
     * 
     ***********************************/
    removeAllTickets = async () => {
        TicketModel.remove({ date: { $ne: "Thu. May 17" } }).exec()
    }

    removeAllOrders = async () => {
        OrderModel.remove({ _id: { $ne: "5af47af19833fc4d6276de6a" } }).exec()
    }

    // public 

    addOrder = async orderId => {
        await this.pullOrderById(orderId, null);
    }

    getOrderById = orderId => {
        let order = this.orderList.filter(order => {
            return JSON.stringify(order._id) == JSON.stringify(orderId);
        });
        return order.length > 0 ? order[0] : null;
    }
}

module.exports = OrderManager;