var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./MovieDescriptionModel')

var moviewSchema = new Schema({
    name: String,
    movieDescription: {type: Schema.Types.ObjectId, required: true, ref: 'MovieDescription'}
}, {
    collection: 'Movie'
});

module.exports = mongoose.model('Movie', moviewSchema);