import React, { useState } from 'react';
import './DeployLine.css'

function DeployLine(props) {

    const [clicked, setClicked] = useState('deploy-checkBtn')

    return (
        <div className="card deploy-checkLine">
            <a href="#/" className={clicked} onClick={() => setClicked('deploy-checkBtn active')}></a>
            <p className="justify-text">{props.text}</p>
        </div>
    );
};

export default DeployLine;

