import React, {Component} from 'react';
import CommonUtils from '../../core/CommonUtils';
import './style.scss';
import DigitalEventLogo from '../../assets/logo-digital3.png';

class StreamTitle extends Component {

    render() {
        return (
            <div id="stream-title">
                <div className="title"> 
                    
                    <h1> 
                        <img  src={CommonUtils.IMAGES.LiveSP} alt="Live" /> 
                        <img id="logoLive" src={DigitalEventLogo} alt="Evento Digital"   ></img>
                     </h1>
                   
                </div>
            </div>
        );
    }

}

export default StreamTitle;