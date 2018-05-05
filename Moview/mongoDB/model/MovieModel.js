var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var moviewSchema = new Schema({
    id: {type: Schema.Types.ObjectId, required: true, ref: 'Movie'},
    name: String,
    movieDescription: {type: Schema.Types.ObjectId, required: true, ref: 'MovieDescription'}
}, {
    collection: 'Movie'
});

module.exports = mongoose.model('Movie', moviewSchema);