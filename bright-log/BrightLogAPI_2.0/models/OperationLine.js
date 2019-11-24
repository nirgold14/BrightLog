var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OperationLine = new Schema({

    id: Number,
    prevID: Number,
    nextID: Number,
    type: String,
    text: String

});

module.exports = mongoose.model('OperationLine', OperationLine);