import React, { useState, useEffect } from 'react'
import './MainScreen.css';


import closeLogo from './Screens/DailyLog/OperationSection/open-menu-btn.png'
import openLogo from './Screens/DailyLog/OperationSection/close-menu-btn.png'

/*Main Screen Apps*/
import DailyLog from './Screens/DailyLog/DailyLog';
import DailyLogDisplay from './Screens/DailyLogDisplay/DailyLogDisplay';
import MessageBoard from './Screens/MessageBoard/MessageBoard';
import UnderConstruction from './Screens/UnderConstruction/UnderConstruction';
import SideBar from './SideBar/SideBar';

/*Main Screen Services */
import notificationService, { NOTIF_SCREEN_CHANGED } from '../services/notificationsService'
let ns = new notificationService();

function MainScreen(props) {

    const [sideBarClass, setSideBarClass] = useState('col-sm-2 sidebar-col')
    const [mainScreenClass, setMainScreenClass] = useState('col-sm-10')
    const [arrowImg, setArrowSide] = useState(closeLogo)
    const [mainScreenArrowClass, setMainScreenArrowClass] = useState('hide')
    const [isMenuOpen, setIsMenuOpen] = useState(true)

    const [activeScreen, setActiveScreen] = useState(<DailyLog />)

    useEffect(() => {
        ns.addObserver(NOTIF_SCREEN_CHANGED, this, toggleScreens)
    }, []);

    /**
     * callBack function to invoke When a new screen's button is pressed at the navBar component.
     */
    function toggleScreens(data) {
        switch (data.screenName) {
            case 'daily-log':
                setActiveScreen(<DailyLog />)
                break;
            case "msg-board":
                setActiveScreen(<MessageBoard />)
                break;
            case "log-summary":
                setActiveScreen(<DailyLogDisplay text={data.text} />)
                break;
            default:
                setActiveScreen(<UnderConstruction />)
        }
    }

    /**
     * Toggle apperance of components when the side menus are called
     */
    function hideSideBar() {
        if (isMenuOpen) {
            setSideBarClass('hide');
            setMainScreenClass('col-sm-12');
            setArrowSide(openLogo);
            setIsMenuOpen(false);
            setMainScreenArrowClass('img-fluid arrow-img')
        } else {
            setSideBarClass('col-sm-2 sidebar-col');
            setMainScreenClass('col-sm-10');
            setArrowSide(closeLogo);
            setIsMenuOpen(true);
            setMainScreenArrowClass('hide')
        }

    }

    return (
        <div className="container-fluid MainScreen">

            <div className="row height-80">
                <div className={mainScreenClass}>
                    <a href="#/" onClick={() => hideSideBar()} class="float-arrow-main"><img src={openLogo} className={mainScreenArrowClass} /></a>
                    {activeScreen}
                </div>
                <div className={sideBarClass}>
                    <a href="#/" onClick={() => hideSideBar()} class="float-arrow-side"><img src={arrowImg} className="img-fluid arrow-img" /></a>
                    <SideBar />
                </div>
            </div>

        </div>





    );




};

export default MainScreen;



