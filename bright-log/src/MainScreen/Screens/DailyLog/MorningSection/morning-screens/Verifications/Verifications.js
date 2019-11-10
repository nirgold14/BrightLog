import React from 'react';
import './Verifications.css';

import SimpleCheckLine from '../../../LogComponents/SimpleCheckLine/SimpleCheckLine';
import CheckListGroup from '../../../LogComponents/CheckListGroup/CheckListGroup'

/**!Important!~~~~~~~ Note To Myself ~~~~~~~ !Important!
 * 
 * Same code as in : Ready,Verifications,Cameras,Eod
 * Better design is to unite them into one component with: "NewCategory={"NewName"}"
 * Same printData function with only difference at the category name:
 * 
 *  return <SimpleCheckLine type={checkLine.type} text={checkLine.text} category={NewCategory} /> 
 */


function Verifications(props) {
    const data = props.data;

    function printData() {

        const list = data.map(function (checkLine) {
            if (checkLine.type === "group") {
                return <CheckListGroup groupContent={checkLine.groupContent} text={checkLine.text} />
            } else if (checkLine.type === "header") {
                return <div className="card lines-header"><p className="card-text">{checkLine.text}</p></div>
            } else {
                return <SimpleCheckLine type={checkLine.type} text={checkLine.text} category={"verifications"} />
            }
        }

        );
        return (list);
    }

    return (
        <div className="container-fluid verfications-wrapper">
            {printData()}
        </div>

    );
};

export default Verifications;