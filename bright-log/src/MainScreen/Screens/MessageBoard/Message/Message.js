import React, { useState, useEffect } from 'react'
import './Message.css'
import user1 from './user1.PNG';
import user2 from './user2.PNG';
import user3 from './user3.PNG';

import HttpService from '../../../../services/httpService';
import notificationService, { NOTIF_seeMsg } from '../../../../services/notificationsService'
const http = new HttpService();
const ns = new notificationService();

/** Message
 * 
 * Each object has his own props:
 * _id | importance|  author | date | subject | content
 * 
 * 
 */
function Message(props) {

    var importance = props.msgData.importance;
    var _id = props.msgData._id;

    if (importance === 1) {
        importance = "urgent"
    } else if (importance === 2) {
        importance = "important"
    } else if (importance === 3) {
        importance = "normal"
    }

    // Currently decide the author by random
    var logoPic = props.msgData.author;
    if (logoPic === "Nir") {
        logoPic = user1
    } else if (logoPic === "Doron") {
        logoPic = user2
    } else if (logoPic === "Daniel") {
        logoPic = user3
    }

    // If user allow delete, a Http Delete request is sent with the requested msg ID.
    // After promise happend, send notification to update the state with the new messages.
    function deleteMsg() {
        var deleteApproved = window.confirm("Are you sure you want to DELETE this message??")
        if (deleteApproved) {
            http.removeForumMsg(JSON.stringify({
                id: _id
            }))
        }

    }

    // Invoke when the seeMsg btn is pressed - causing a screen change.
    function seeMsg() {
        ns.postNotification(NOTIF_seeMsg, props.msgData.content, "currrentMsg")
    }

    return (
        <div className="card message-wrapper">
            <a href="/#" class="close-btn" onClick={deleteMsg} >X</a>
            <p className="importance-circle" id={importance}></p>
            <p className="publish-date" >{props.msgData.date}</p>
            <img src={logoPic} className="user-logo" />
            <p className="userName-text">{props.msgData.author}</p>
            <div className="subject-box subject-title">Subject: </div>
            <div className="subject-box subject-text">{props.msgData.subject}</div>
            <button type="button" class="btn btn-secondary open-message-btn" onClick={seeMsg}>See Message...</button>
        </div>
    );

}

export default Message;