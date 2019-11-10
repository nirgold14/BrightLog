var mongoose = require('mongoose');
var Schema = mongoose.Schema; //help to organize, defy NOSQL.

var deployment = new Schema({
    name: String,
    CurrentVersion: String,
    Text: [String]
});

module.exports = mongoose.model('Deployment', deployment);