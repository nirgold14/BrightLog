const express = require('express')
const forumRouter = express.Router();
const ForumMsg = require('../models/ForumMsg')


/**
  *   Http Request:  GET 
  *   Path:          /Forum
  *   Purpose:       return all the Forum messages  
  **/
forumRouter.get('/', async (req, res) => {
    try {
        const data = await ForumMsg.find()
        res.json(data)
    } catch (err) {
        res.json({ message: err })
    }
})

/**
  *   Http Request:  POST
  *   Path:          /Forum
  *   Purpose:       Add new ForumMsg to the DB 
  **/
forumRouter.post('/', async (req, res) => {
    var Msg = new ForumMsg({
        importance: req.body.importance,
        date: req.body.date,
        author: req.body.author,
        subject: req.body.subject,
        content: req.body.content,
    })
    try {
        const savedMsg = await Msg.save()
        res.json(savedMsg)

    } catch (err) {
        res.json({ message: err })
    }
})

/**
  *   Http Request:  DELETE 
  *   Path:          /Forum
  *   Purpose:       Delete the message matching the ID.
  **/
forumRouter.delete('/', async (req, res) => {
    try {
        const removedMsg = await ForumMsg.deleteOne({ _id: req.body.id })
        res.json(removedMsg)
    } catch (err) {
        res.json({ message: err })
    }
});

module.exports = forumRouter