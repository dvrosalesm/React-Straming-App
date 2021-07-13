import React, {Component} from 'react';
import './style.scss';

class StreamingPlayer extends Component {

    render() {
        return (
            <div id="stream-player">
                <div className="player">
                    <iframe title="Stream Player" allowFullScreen={true} src={this.props.streamingUrl}></iframe>
                </div>
            </div>
        );
    }

}

export default StreamingPlayer;