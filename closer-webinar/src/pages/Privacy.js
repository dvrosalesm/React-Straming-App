import React, {Component} from 'react';
import {FlexboxGrid, Col} from 'rsuite';
import WebinarLayout from './_layouts/WebinarLayout';
import {API} from '../core/API';
import { Auth } from '../core/Auth';

class Privacy extends Component {
    
    constructor() {
        super();
        this.state = {
            event: {
                documents: [],
                streaming_configuration: {
                    rmtp_url: "",
                    enable_chat: 0,
                    enable_documents: 0,
                    enable_notes: 0,
                    enable_registration: 1,
                    status: 0
                },
                name: ""
            },
            acceptedTerms: false,
            loading: true,
            assistance: false,
            sizes: {
                streaming: 16,
                chat: 8,
                documents: 10,
                notes: 14,
                special_case: false
            }
        }

        this.onAssistance = this.onAssistance.bind(this);
        this.onLogout = this.onLogout.bind(this);

    }

    componentDidMount() {
        API.getEvent( {
            event: this.props.match.params.closerId
        },  (res) => {
            res = res[0];
            this.setState({
                event: res,
                loading: false
            });


        }, 
        (e) => {
            
        })
    }

    onAssistance() {
        this.setState({assistance: true});
    }

    onLogout() {
        Auth.setCurrentUser(null);
        this.setState({
            assistance: false
        });
        this.forceUpdate();
    }

    onBack() {
        window.close();
    }


    render() {

        return (
            <WebinarLayout hasLoaded={false} webinarBackground={this.state.event.background}> 
                <FlexboxGrid justify="center">
                    <FlexboxGrid.Item componentClass={Col}  colspan={24} md={12} sm={24}>
                        <div className="register-container policies">
                            <p className="maintext">PRIVACIDAD</p>
                            <div className="policies-container">
                                <div dangerouslySetInnerHTML={{__html: this.state.event.privacy_policy}}>

                                </div>
                            </div>
                            <button className="btn-primary" id="acceptpolicy" onClick={this.onBack}>Regresar</button>
                                
                        </div>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </WebinarLayout>  
        )
        
        
    }

}

export default Privacy;