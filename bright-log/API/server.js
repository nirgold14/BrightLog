var express = require('express'); // Handles REST Web requests
var cors = require('cors');

var app = express();
var mongoose = require('mongoose'); // Framework for MongoDB actions
var db = mongoose.connect('mongodb://localhost/BrightLog');
var bodyParser = require('body-parser');
/*
app.use using the middleware, so this is the first layer a request is passing before reaching us.
bodyParser.json() - will format all requests into JSON
bodyParser.urlencoded - reject any unKnown formats
*/
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

var ForumMsg = require('./models/ForumMsg');
var Deployment = require('./models/Deployments');
var CheckLine = require('./models/CheckLine');
var OperationLine = require('./models/OperationLine');

//WriteToFile ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const fs = require('fs');

app.post('/write', async (req, res, next) => {

    fs.writeFile('C:\\Users\\nirgo\\Desktop\\BrightLog\\DailyLogTest.txt', req.body.text, function (err) {
        if (err) throw err;
        else {
            res.status(200).send(req.body.text)

        }
    });
});


//Operation Line ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 *   Http Request:  GET 
 *   Path:         /OperationLine
 *   Purpose:      return all the OperationLines  
 **/

app.get('/OperationLine', function (req, res) {

    OperationLine.find({}, function (err, OperationLines) {
        if (err) {
            res.status(500).send({ error: "Couldn't fetch Operation Lines" })
        } else {
            res.send(OperationLines)
        }
    })
})


/**
  *   Http Request:  POST 
  *   Path:         /OperationLine
  *   Purpose:      add new OperationLine to DB
  **/
app.post('/OperationLine', function (req, res) {

    var operationLine = new OperationLine();
    operationLine.id = req.body.line.id;
    operationLine.prevID = req.body.line.prevID;
    operationLine.nextID = req.body.line.nextID;
    operationLine.type = req.body.line.type;
    operationLine.text = req.body.line.text;


    operationLine.save(function (err, savedOperationLine) {
        if (err) {
            res.status(500).send({ error: "OperationLine" })
        } else {
            res.status(200).send({ savedOperationLine })
        }
    })
})

/**
  *   Http Request:  POST
  *   Path:         /OperationLine/updateNextID
  *   Purpose:      Update the mainID line nextID field with the ID of the new changeID.
  **/
app.post('/OperationLine/updateNextID', function (req, res) {

    OperationLine.findOneAndUpdate(
        { "id": req.body.mainID },
        { "$set": { "nextID": req.body.changeID } },

        function (err, doc) {
            if (err) { // err: any errors that occurred
                res.status(500).send({ error: "OperationLine" })
            } else { // doc: the document before updates are applied if `new: false`
                res.status(200).send()
            }
        }
    );
});


/**
*   Http Request:  POST
*   Path:         /OperationLine/updatePrevID
*   Purpose:      Update the mainID line prevID field with the ID of the new changeID.
**/
app.post('/OperationLine/updatePrevID', function (req, res) {

    OperationLine.findOneAndUpdate(
        { "id": req.body.mainID },
        { "$set": { "prevID": req.body.changeID } },

        function (err, doc) {
            if (err) { // err: any errors that occurred
                res.status(500).send({ error: "OperationLine" })
            } else { // doc: the document before updates are applied if `new: false`
                res.status(200).send()
            }
        }
    );
});


/**
  *   Http Request:      DELETE 
  *   Path:              /OperationLine
  *   Purpose:           Delete the line matching the ID.
  **/
app.delete('/OperationLine', function (req, res) {
    const id = req.body.id;

    OperationLine.findOneAndRemove({ id }, (err, msg) => {
        if (err) {
            res.status(400).json(err);
        }
        if (!msg) {
            res.status(404).json({ message: 'Line not found.' + _id });
        }
        res.json('Line Deleted');
    });

});
// CheckLines ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
  *   Http Request:  GET 
  *   Path:         /CheckLine
  *   Purpose:      Build a query that will return us the checkLines matching to the input categories.
  **/
app.get('/CheckLine', function (req, res) {
    var category = req.query.category;
    var sub_Category = req.query.sub_Category;
    var sub_sub_Category = req.query.sub_sub_Category;
    console.log("get-CheckLines")
    var query = {};
    if (typeof (category) != "undefined") {
        if (sub_Category != "undefined") {
            if (sub_sub_Category != "undefined") {
                query = { category: category, sub_Category: sub_Category, sub_sub_Category: sub_sub_Category }
            } else {
                query = { category: category, sub_Category: sub_Category }
            }
        } else {
            query = { category: category }
        }
    }

    CheckLine.find(query, function (err, CheckLines) {
        if (err) {
            res.status(500).send({ error: "Couldn't fetch CheckLines" })
        } else {
            res.send(CheckLines)
        }
    })
})
/**
  *   Http Request: POST 
  *   Path:         /CheckLine
  *   Purpose:      Add new checkLine to the DB
  **/
app.post('/CheckLine', function (req, res) {

    var checkLine = new CheckLine();
    checkLine.category = req.body.category;
    checkLine.sub_Category = req.body.sub_Category;
    checkLine.sub_sub_Category = req.body.sub_sub_Category;
    checkLine.type = req.body.type;
    checkLine.text = req.body.text;

    checkLine.save(function (err, savedCheckLine) {
        if (err) {
            res.status(500).send({ error: "Couldn't save checkLine" })
        } else {
            res.status(200).send({ savedCheckLine })
        }
    })
})
// Forum Messages ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
  *   Http Request:  POST
  *   Path:          /Forum
  *   Purpose:       Add new ForumMsg to the DB 
  **/
app.post('/Forum', function (req, res) {
    var message = new ForumMsg();
    message.importance = req.body.importance.importance;
    message.date = req.body.date;
    message.author = req.body.author;
    message.subject = req.body.subject;
    message.content = req.body.content;
    message.save(function (err, savedMessage) {
        if (err) {
            res.status(500).send({ error: "Couldn't save Message" })
        } else {
            res.status(200).send({ savedMessage })
        }
    })
})

/**
  *   Http Request:  GET 
  *   Path:          /Forum
  *   Purpose:       return all the Forum messages  
  **/
app.get('/Forum', function (req, res) {

    ForumMsg.find({}, function (err, messages) {
        if (err) {
            res.status(500).send({ error: "Couldn't fetch messages" })
        } else {
            res.send(messages)
        }
    })
})

/**
  *   Http Request:  DELETE 
  *   Path:          /Forum
  *   Purpose:       Delete the message matching the ID.
  **/
app.delete('/Forum', function (req, res) {
    const _id = req.body.id;

    ForumMsg.findOneAndRemove({ _id }, (err, msg) => {
        if (err) {
            res.status(400).json(err);
        }
        if (!msg) {
            res.status(404).json({ message: 'Message not found.' + _id });
        }
        res.json('Message Deleted');
    });

});

app.listen(3005, function () {
    console.log("Welcome to Bright-Log API!!")
})
