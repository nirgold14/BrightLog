var mongoose = require('mongoose');
var Schema = mongoose.Schema; //help to organize, defy NOSQL.

var checkLine = new Schema({
    
    category: String,
    sub_Category: String,
    sub_sub_Category: String,
    type: String,
    text: String,
    group_Content: []

    
});

module.exports = mongoose.model('CheckLine', checkLine);