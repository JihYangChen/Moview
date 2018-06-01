var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({
    fbId: String,
    name: String,
    email: String,
    profileUrl: String
}, {
    collection: 'Member'
});

module.exports = mongoose.model('Member', memberSchema);