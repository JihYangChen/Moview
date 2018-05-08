var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./SeatModel');

var hallSchema = new Schema({
    name: String,
    seatList: [{type: Schema.Types.ObjectId, required: true, ref: 'Seat'}]
}, {
    collection: 'Hall'
});

module.exports = mongoose.model('Hall', hallSchema);