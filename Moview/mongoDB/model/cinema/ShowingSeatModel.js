var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./SeatModel');

var showingSeatSchema = new Schema({
    seat: {type: Schema.Types.ObjectId, required: true, ref: 'Seat'},
    isOccupied: Boolean
}, {
    collection: 'ShowingSeat'
});

module.exports = mongoose.model('ShowingSeat', showingSeatSchema);