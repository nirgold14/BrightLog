import React, {useState} from 'react';
import './QuickMenu.css';

function QuickMenu(props){

    function  evaFsrBtnPressed(e){
        var btn = e.target
        var isEva = false
        var isActive = false
        var number= btn.id[btn.id.length-1]
        var values=[1,3,5];
        if(btn.id.includes('eva')){isEva=true}
        if(btn.className.includes('active')){isActive=true}
        if(!isActive){
            btn.className+=' chosen-menu-btn-active'
            if(isEva){values=[1,2,3,4,5]}

            for(var x=0; x<values.length;x++){
                if(values[x].toString()!==number){
                    if(isEva){
                        document.getElementById('eva'+values[x]).className ='card-link eva-fsr-btn'
                    }else{
                        document.getElementById('fsr'+values[x]).className ='card-link eva-fsr-btn'
                    }
                }
            }
        }
    }

    function extractBtnPressed(e) {
        var btn = e.target;
        var number = btn.id[btn.id.length - 1]
        var isOpening = false
        var isChosen = false;
        
        if (btn.className.includes('close') || btn.className.includes('active')) {
            isChosen = true;
        }
        if ((btn.id).includes('open')) { isOpening = true }
        if (!isChosen) {
            if (isOpening) {
                btn.className += ' chosen-menu-btn-active'
                document.getElementById('close' + number).className = "card-link link-extract"
            } else {
                btn.className += ' chosen-menu-btn-close'
                document.getElementById('open' + number).className = "card-link link-extract"
            }

        }
    }


    return(
        <div className="quick-action-wrapper">
                        <div className="card quick-action-item">
                            <h3 class="card-title quick-title">Eva ctrl Point</h3>
                            <p className="card-text quick-btn-section">
                                <a href="#" class="card-link eva-fsr-btn chosen-menu-btn-active" id="eva1" onClick={evaFsrBtnPressed}>1</a>
                                <a href="#" class="card-link eva-fsr-btn" id="eva2" onClick={evaFsrBtnPressed}>2</a>
                                <a href="#" class="card-link eva-fsr-btn" id='eva3' onClick={evaFsrBtnPressed}>3</a>
                                <a href="#" class="card-link eva-fsr-btn" id='eva4' onClick={evaFsrBtnPressed}>4</a>
                                <a href="#" class="card-link eva-fsr-btn" id='eva5' onClick={evaFsrBtnPressed}>5</a>
                            </p>
                        </div>
                        <div className="card quick-action-item">
                            <h3 class="card-title quick-title">FSR</h3>
                            <p className="card-text quick-btn-section">
                                <a href="#" class="card-link eva-fsr-btn chosen-menu-btn-active" id="fsr1" onClick={evaFsrBtnPressed}>1</a>
                                <a href="#" class="card-link eva-fsr-btn" id='fsr3' onClick={evaFsrBtnPressed}>3</a>
                                <a href="#" class="card-link eva-fsr-btn" id='fsr5' onClick={evaFsrBtnPressed}>5</a>
                            </p>
                        </div>
                        <div className="card quick-action-item ">
                            <h3 class="card-title quick-title">Extractions</h3>
                            <p className="card no-border">

                                <div className="extraction-container1">
                                    <h4 class="card-title quick-title-extract">6</h4>
                                    <h4 class="card-title quick-title-extract">7</h4>
                                    <h4 class="card-title quick-title-extract">8</h4>
                                </div>


                                <div className="extraction-container2">
                                    <a href="#" class="card-link link-extract" id="open6" onClick={extractBtnPressed}>open</a>
                                    <a href="#" class="card-link link-extract" id="open7" onClick={extractBtnPressed}>open</a>
                                    <a href="#" class="card-link link-extract" id="open8" onClick={extractBtnPressed}>open</a>
                                </div>


                                <div className="extraction-container2">
                                    <a href="#" class="card-link link-extract chosen-menu-btn-close" id="close6" onClick={extractBtnPressed}>close</a>
                                    <a href="#" class="card-link link-extract chosen-menu-btn-close" id="close7" onClick={extractBtnPressed}>close</a>
                                    <a href="#" class="card-link link-extract chosen-menu-btn-close" id="close8" onClick={extractBtnPressed}>close</a>
                                </div>

                            </p>
                        </div>
                      <a href="#/" className="esd-btn">  <div className="esd-text">TRIP</div></a>

                    </div>
    );
}
export default QuickMenu;