import React, {Component} from 'react';
import {FlexboxGrid, Col} from 'rsuite';
import WebinarLayout from './_layouts/WebinarLayout';
import {API} from '../core/API';
import Register from '../components/Register';
import { Auth } from '../core/Auth';
import { Link } from 'react-router-dom';

class Webinar extends Component {
    
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
        this.onAcceptPolicies = this.onAcceptPolicies.bind(this);

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

    onAcceptPolicies() {
        this.setState({acceptedTerms: true});
    }


    render() {

        if(!this.state.acceptedTerms) {
            return (
                <WebinarLayout hasLoaded={false} webinarBackground={this.state.event.background}> 
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item componentClass={Col}  colspan={24} md={12} sm={24}>
                            <div className="register-container policies">
                                <p className="maintext">REGISTRO</p>
                                <div className="policies-container">
                                    <div >
                                        <div dangerouslySetInnerHTML={{__html: this.state.event.terms_conditions}}>

                                        </div>
                                        <p>
                                           <br></br> 
                                        </p>
                                        <p className="policies-text">
                                            <Link target="_blank" style={{color:'black', textDecorationLine: 'underline', textAlign: 'left', whiteSpace:'nowrap'}} to={this.state.event ? "/webinar/" + this.state.event.uuid + "/privacy" : ""}>Aviso de privacidad Guatemala</Link>
                                            <Link target="_blank" style={{color:'black', textDecorationLine: 'underline', textAlign: 'left', flexShrink: 1 }}to={this.state.event ? "/webinar/" + this.state.event.uuid + "/privacy" : ""}>Aviso de privacidad Honduras</Link>
                                        </p>
                                        
                                    </div>
                                </div>
                                <button className="btn-primary" id="acceptpolicy" onClick={this.onAcceptPolicies}>Acepto proceder con el Registro</button>
                                    
                            </div>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </WebinarLayout>  
            )
        }

        return (
            <WebinarLayout hasLoaded={false}> 
                <FlexboxGrid justify="center">
                    <FlexboxGrid.Item componentClass={Col}  colspan={24} md={12} sm={24}>
                        <Register config={this.state.event}/>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </WebinarLayout>    
        );
        
    }

}

export default Webinar;