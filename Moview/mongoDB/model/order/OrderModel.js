var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('../cinema/ShowingModel');
require('../order/TicketModel');

var orderSchema = new Schema({
    status: String,
    showing: {type: Schema.Types.ObjectId, required: true, ref: 'Showing'},
    ticketList: [{type: Schema.Types.ObjectId, required: true, ref: 'Ticket'}]
}, {
    collection: 'Order',
    versionKey: false
});

module.exports = mongoose.model('Order', orderSchema);