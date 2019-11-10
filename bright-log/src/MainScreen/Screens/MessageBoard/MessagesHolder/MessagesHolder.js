import React, { useState, useEffect } from 'react'
import './MessagesHolder.css'
import Message from '../Message/Message';


/**Map over the DB output, create a Message object for each line, and display. */

function MessagesHolder(props) {

    function forum_messages() {
        const list = props.array.map((msg) =>
            <Message msgData={msg} />
        );

        return (list);
    }

    return (
        forum_messages()
    );

}

export default MessagesHolder;