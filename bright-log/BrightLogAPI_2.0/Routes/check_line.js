const express = require('express')
const checkLineRouter = express.Router();
const CheckLine = require('../models/CheckLine')


/**
  *   Http Request:  GET 
  *   Path:         /CheckLine
  *   Purpose:      Build a query that will return us the checkLines matching to the input categories.
  **/
checkLineRouter.get('/', async (req, res) => {
    var category = req.query.category ? req.query.category : null;
    var sub_Category = req.query.sub_Category ? req.query.sub_Category : null;
    try {
        const checkLine = await CheckLine.find({ category: category, sub_Category: sub_Category });
        res.json(checkLine)
    } catch (err) {
        res.json({ message: err })
    }
})
/**
  *   Http Request: POST 
  *   Path:         /CheckLine
  *   Purpose:      Add new checkLine to the DB
  **/
checkLineRouter.post('/', async (req, res) => {
    var checkLine = new CheckLine({
        category: req.body.category,
        sub_Category: req.body.sub_Category,
        sub_sub_Category: req.body.sub_sub_Category,
        type: req.body.type,
        text: req.body.text
    })
    try {
        const savedCheckLine = await checkLine.save()
        res.json(savedCheckLine)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = checkLineRouter