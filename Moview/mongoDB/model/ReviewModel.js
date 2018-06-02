var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    title: String,
    createTime: String,
    content: String,
    likeAmount: Number,
    dislikeAmount: Number
}, {
    collection: 'Review'
});

module.exports = mongoose.model('Review', reviewSchema);