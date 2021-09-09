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