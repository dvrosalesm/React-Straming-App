import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Button, ButtonToolbar, Alert} from 'rsuite';
import { API } from '../../core/API';
import { Auth } from '../../core/Auth';
import DigitalEventLogo from '../../assets/logo-digital.png';
import DigitalEventLogo2 from '../../assets/logo-digital2.png';
import {withRouter} from 'react-router-dom';

import './style.scss';

class Assistance extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: ""
        }

        this.submitAssistance = this.submitAssistance.bind(this);
        this.newUser = this.newUser.bind(this);
        this.continueUser = this.continueUser.bind(this);
        this.register = this.register.bind(this);
    }

    register() {
        this.props.history.push("/webinar/" + this.props.eventId + "/register");
    }

    submitAssistance() {
        //let name = document.getElementById('assistance_name').value;
        let email = document.getElementById('assistance_email').value;
    
        if(email.trim() === "") {
            Alert.error("El correo electronico es requerido.")
        } else {

            API.assistance({
                    name: "Usuario",
                    email: email,
                    event_id: this.props.eventId
                },
                (res) => {
                    if(res.status === "error") {
                        console.log(res);
                        Alert.error(res.messsage);
                    } else {
                        Auth.setCurrentUser({
                            name: "Usuario",
                            email: email,
                            event_id: this.props.eventId
                        });
                        this.props.onAssistance();
                    }
                },  
                (err) => {
                    console.log(err);
                })

        }
    }

    newUser() {
        Auth.setCurrentUser(null);
        this.forceUpdate();
    }

    continueUser() {
        this.props.onAssistance();
    }

    render() {
        return (
            <div id="assistance-form">
                <h3 >BIENVENIDOS AL</h3>
                <br></br> 
                <p><img src={DigitalEventLogo2} alt="Evento Digital 2" id="centerImage" width="500px" max-width="100%"></img></p>
                <h2>Ingresa tu correo electr??nico</h2>
                <h4>para unirte al evento</h4>
                <Form fluid onSubmit={this.submitAssistance}>    
                    <FormGroup>
                        <FormControl name="email" id="assistance_email" placeholder="Correo electr??nico" />
                    </FormGroup>
                    <FormGroup>
                        <ButtonToolbar>
                            <Button appearance="primary" id="login" block onClick={this.submitAssistance}>Ingresar</Button>
                            <Button appearance="primary" id="register" block onClick={this.register}>Reg??strese</Button>
                        </ButtonToolbar>
                    </FormGroup>
                </Form>
            </div>
        );
    }

}

export default withRouter(Assistance);