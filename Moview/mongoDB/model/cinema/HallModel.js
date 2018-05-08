var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hallSchema = new Schema({
    name: String,
    seatList: [String]
}, {
    collection: 'Hall'
});

module.exports = mongoose.model('Hall', hallSchema);