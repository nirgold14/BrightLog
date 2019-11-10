import React from 'react';
import './MorningSection.css';

import Subject from './Subject'

/**
 * Holds the accordion of subjects.
 * 
 * In order to add new Subjects: 
 * screenID - x + 1
 * title - screen title
 * cardId - 'heading' + NextNumber
 * DivId - 'collapse' + NextNumber
 * BtnDataTarget - '#collapse' + NextNumber 
 **/


function MorningSection(props) {


    return (
        <div className={props.isHide}>
            <div class="accordion morning-ChkList screen-row" id="accordionExample">
                <Subject screenID={0} title='verifications' cardId="headingOne" DivId="collapseOne" BtnDataTarget="#collapseOne" />
                <Subject screenID={1} title='cameras' cardId="headingTwo" DivId="collapseTwo" BtnDataTarget="#collapseTwo" />
                <Subject screenID={2} title='screens' cardId="headingThree" DivId="collapseThree" BtnDataTarget="#collapseThree" />
                <Subject screenID={3} title='ready' cardId="headingFour" DivId="collapseFour" BtnDataTarget="#collapseFour" />
            </div>
        </div>

    );
};

export default MorningSection;