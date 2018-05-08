var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var seatSchema = new Schema({
    row: String,
    column: String
}, {
    collection: 'Seat'
});

module.exports = mongoose.model('Seat', seatSchema);