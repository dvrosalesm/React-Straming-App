import React, {Component} from 'react';
import CommonUtils from '../../core/CommonUtils';
import './style.scss';

class StreamTitle extends Component {

    render() {
        return (
            <div id="stream-title">
                <div className="title"> 
                    <h1> <img src={CommonUtils.IMAGES.LiveSP} alt="Live" /> {this.props.title} </h1>
                </div>
            </div>
        );
    }

}

export default StreamTitle;