var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CheckLine = new Schema({

    category: String,
    sub_Category: String,
    sub_sub_Category: String,
    type: String,
    text: String,
    group_Content: []
});

module.exports = mongoose.model('CheckLine', CheckLine);