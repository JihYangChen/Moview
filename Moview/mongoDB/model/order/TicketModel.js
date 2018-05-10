var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('../cinema/SeatModel');

var ticketSchema = new Schema({
    ticketCategory: String,
    date: String,
    time: String,
    price: String,
    seat: {type: Schema.Types.ObjectId, required: false, ref: 'Seat'}
}, {
    collection: 'Ticket',
    versionKey: false
});

module.exports = mongoose.model('Ticket', ticketSchema);