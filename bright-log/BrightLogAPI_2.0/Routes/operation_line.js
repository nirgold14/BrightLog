const express = require('express')
const operationLineRouter = express.Router();
const OperationLine = require('../models/OperationLine')

/**
 *   Http Request:  GET 
 *   Path:         /OperationLine
 *   Purpose:      return All the OperationLines  
 **/

operationLineRouter.get('/', async (req, res) => {
    try {
        const data = await OperationLine.find();
        res.json(data)
    } catch (err) {
        res.json({ message: err })
    }
})

/**
  *   Http Request:  POST 
  *   Path:         /OperationLine
  *   Purpose:      add new OperationLine to DB
  **/
operationLineRouter.post('/', async (req, res) => {

    var operationLine = new OperationLine({
        id: req.body.id,
        prevID: req.body.prevID,
        nextID: req.body.nextID,
        type: req.body.type,
        text: req.body.text
    });

    try {
        const savedLine = await operationLine.save();
        res.json(savedLine)
    } catch (err) {
        res.json({ message: err })
    }
})

/**
  *   Http Request:  POST
  *   Path:         /OperationLine/updateNextID
  *   Purpose:      Update the mainID line nextID field with the ID of the new changeID.
  **/
operationLineRouter.patch('/updateNextID', async (req, res) => {

    try {
        const updatedLine = await OperationLine.updateOne(
            { id: req.body.mainID },
            { $set: { nextID: req.body.changeID } }
        )
        res.json(updatedLine)
    } catch (err) {
        res.json({ message: err })
    }
});


/**
*   Http Request:  POST
*   Path:         /OperationLine/updatePrevID
*   Purpose:      Update the mainID line prevID field with the ID of the new changeID.
**/
operationLineRouter.patch('/updatePrevID', async (req, res) => {

    try {
        const updatedLine = await OperationLine.updateOne(
            { id: req.body.mainID },
            { $set: { prevID: req.body.changeID } }
        )
        res.json(updatedLine)
    } catch (err) {
        res.json({ message: err })
    }
});


/**
  *   Http Request:      DELETE 
  *   Path:              /OperationLine
  *   Purpose:           Delete the line matching the ID.
  **/
operationLineRouter.delete('/', async (req, res) => {
    try {
        const removedLine = await OperationLine.deleteOne({ id: req.body.id })
        res.json(removedLine)
    } catch (err) {
        res.json({ message: err })
    }
});

module.exports = operationLineRouter