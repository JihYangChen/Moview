var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieDescriptionSchema = new Schema({
    coverUrl: String,
    posterUrl: String,
    casts: [String],
    directors: [String],
    categories: [String],
    gallery: [String],
    reviewRating: String,
    trailers: [String],
    storyline: String,
    runtime: String,
    releaseDate: String,
    inTheater: Boolean,
    updateIndex: Number
}, {
    collection: 'MovieDescription'
});

module.exports = mongoose.model('MovieDescription', movieDescriptionSchema);