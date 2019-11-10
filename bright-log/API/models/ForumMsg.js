var mongoose = require('mongoose');
var Schema = mongoose.Schema; //help to organize, defy NOSQL.

var message = new Schema({
    
    importance: Number,
    date: String,
    author: String,
    subject: String,
    content: String
});

module.exports = mongoose.model('ForumMsg', message);