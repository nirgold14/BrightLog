const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

//DB Connection
var mongoose = require('mongoose'); // Framework for MongoDB actions
var db = mongoose.connect('mongodb://localhost/BrightLog',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to DB!!!")
    });

//Import Routes
const OperationLineRoute = require('./Routes/operation_line')
const ForumRoute = require('./Routes/forum')
const CheckLineRoute = require('./Routes/check_line')


//Middlewares:  
app.use(cors());
app.use(bodyParser.json());
app.use('/OperationLine', OperationLineRoute);
app.use('/Forum', ForumRoute);
app.use('/CheckLine', CheckLineRoute);


//Routes
app.get('/', (req, res) => {
    res.send('We are on HomePage')
});






app.listen(3005);