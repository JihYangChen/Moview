var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('../MovieModel');
require('./HallModel');

var showingSchema = new Schema({
    time: String,
    movie: {type: Schema.Types.ObjectId, required: true, ref: 'Movie'},
    hall: {type: Schema.Types.ObjectId, required: true, ref: 'Hall'}
}, {
    collection: 'Showing'
});

module.exports = mongoose.model('Showing', showingSchema);