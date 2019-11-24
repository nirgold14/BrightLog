var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Message = new Schema({

    importance: Number,
    date: String,
    author: String,
    subject: String,
    content: String
});

module.exports = mongoose.model('ForumMsg', Message);