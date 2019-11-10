var mongoose = require('mongoose');
var Schema = mongoose.Schema; //help to organize, defy NOSQL.

var OperationLine = new Schema({

    id: Number,
    prevID: Number,
    nextID: Number,
    type: String,
    text: String,

});

module.exports = mongoose.model('OperationLine', OperationLine);