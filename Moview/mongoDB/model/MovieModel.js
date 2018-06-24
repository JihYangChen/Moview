var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./MovieDescriptionModel');
require('./ReviewModel');

var moviewSchema = new Schema({
    name: String,
    movieDescription: {type: Schema.Types.ObjectId, required: true, ref: 'MovieDescription'},
    reviewList: [{type: Schema.Types.ObjectId, required: true, ref: 'Review'}],
    updateIndex: Number
}, {
    collection: 'Movie'
});

module.exports = mongoose.model('Movie', moviewSchema);