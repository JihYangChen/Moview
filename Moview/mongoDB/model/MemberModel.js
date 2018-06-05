var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./ReviewModel');

var memberSchema = new Schema({
    fbId: String,
    name: String,
    email: String,
    profileUrl: String,
    reviewList: [{type: Schema.Types.ObjectId, required: true, ref: 'Review'}],
    likeReviewIds: [String],
    dislikeReviewIds: [String]
}, {
    collection: 'Member',
    versionKey: false
});

module.exports = mongoose.model('Member', memberSchema);