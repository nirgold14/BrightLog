import React, { useState, useEffect } from 'react';
import './OperationSection.css';

import openLogo from './open-menu-btn.png'
import closeLogo from './close-menu-btn.png'
import QuickMenu from './QuickMenu/QuickMenu';
import LogScreen from './LogScreen/LogScreen';



function OperationSection(props) {

    const [quickActionScreen, setQuickActionScreen] = useState('hide')
    const [DailyLogScreen, setDailyScreen] = useState('col-sm-11 h-100')
    const [arrowImg, setArrowImg] = useState(openLogo)
    const [menuStatus, setMenuStatus] = useState(false)

    //Toggle quickMenu hide/show due to arrow btn click.
    function quickMenuArrowClicked() {

        if (menuStatus) {
            setArrowImg(openLogo)
            setQuickActionScreen('hide')
            setDailyScreen('col-sm-11 h-100')
            setMenuStatus(false)
        } else {
            setArrowImg(closeLogo)
            setQuickActionScreen('col-sm-2 no-side-pad')
            setDailyScreen('col-sm-9 h-100')
            setMenuStatus(true)
        }
    }


    return (
        <div className={props.isHide} id='screen-wrapper-99'>
            <div className="row screen-row">
                <div className={quickActionScreen}>
                    <QuickMenu />
                </div>
                <div className="col-sm-1 no-side-pad">  <a href="#/" onClick={() => quickMenuArrowClicked()} ><img src={arrowImg} className="img-fluid nav-img"></img></a></div>
                <div className={DailyLogScreen}>
                    <LogScreen />
                </div>
            </div>
        </div>

    );
};

export default OperationSection;