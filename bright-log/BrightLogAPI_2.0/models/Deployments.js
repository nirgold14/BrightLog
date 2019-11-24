var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Deployment = new Schema({
    name: String,
    CurrentVersion: String,
    Text: [String]
});

module.exports = mongoose.model('Deployment', Deployment);