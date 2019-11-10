import React from 'react';
import './EodSection.css';
import SimpleCheckLine from '../../DailyLog/LogComponents/SimpleCheckLine/SimpleCheckLine';
import CheckListGroup from '../../DailyLog/LogComponents/CheckListGroup/CheckListGroup'

/**Eod Section
 * His props includes the checkLines objects that relative to this category.
 * The function map through the DB outputs and create an instance of checkListGroup/SimpleCheckLine objects
 * due to their paramaters
 * 
 * CheckListGroup needs improve. still working though...
 * 
 * Finally, print the list of the new objects.
 */

function EodSection(props) {

    const data = props.data;
    function printData() {
        const list = data.map(function (checkLine) {
            if (checkLine.type === "group") {
                return <CheckListGroup groupContent={checkLine.groupContent} text={checkLine.text} />
            } else if (checkLine.type === "header") {
                return <div className="card lines-header"><p className="card-text">{checkLine.text}</p></div>
            } else {
                return <SimpleCheckLine type={checkLine.type} text={checkLine.text} category={"eod"} />
            }
        }

        );
        return (list);

    }

    return (
        <div className={props.isHide} id='screen-wrapper-99'>
            <div className="row screen-row">
                {printData()}
            </div>
        </div>

    );
};

export default EodSection;