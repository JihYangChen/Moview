var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('../MovieModel');
require('./HallModel');
require('./ShowingSeatModel');

var showingSchema = new Schema({
    time: String,
    movie: {type: Schema.Types.ObjectId, required: true, ref: 'Movie'},
    hall: {type: Schema.Types.ObjectId, required: true, ref: 'Hall'},
    showingSeatList: [{type: Schema.Types.ObjectId, required: true, ref: 'ShowingSeat'}]
}, {
    collection: 'Showing'
});

module.exports = mongoose.model('Showing', showingSchema);