import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Button, ButtonToolbar, Alert, List, SelectPicker} from 'rsuite';
import { API } from '../../core/API';
import DigitalEventLogo from '../../assets/logo-digital.png';
import {withRouter} from 'react-router-dom';
import './style.scss';
import DigitalEventLogo2 from '../../assets/logo-digital2.png';
import AddToCalendar from 'react-add-to-calendar';
var Loader = require('react-loaders').Loader;

class Assistance extends Component {
    
    constructor() {
        super();

        this.state = {
            country: null,
            submitting: false,
            submitted: false,
            calendar: {
                title: 'ABBOTT | CUMBRE NUTRICIONAL',
                description: "",
                startTime: '2021-07-22T07:00:00-06:00',
                endTime: '2021-07-22T13:00:00-06:00'
            }
        }

        this.submitAssistance = this.submitAssistance.bind(this);
        this.countryChange = this.countryChange.bind(this);
        this.backToLogin = this.backToLogin.bind(this);
    }

    backToLogin() {
        this.props.history.push("/webinar/" + this.props.match.params.closerId);
    }

    submitAssistance() {
        this.setState({
            submitting: true
        });
        let name = document.getElementById('registered_name').value;
        let lastname = "";
        let phone = "";
        let company = document.getElementById('registered_company').value;
        let email = document.getElementById('registered_email').value;
        let confirmEmail = document.getElementById('registered_confirm_email').value;
        let profession = "";
    
        if(name === "" || email.trim() === ""  || confirmEmail.trim() === ""  || company.trim() === "" ||
           this.state.country === null) {
            Alert.error("Todos los campos son requeridos.")
            this.setState({
                submitting: false
            });
        }else if (email !== confirmEmail) {
            Alert.error("Los correos electrónicos no coinciden.")
            this.setState({
                submitting: false
            });
        } else {
            API.register({
                name: name,
                lastname: lastname,
                phone: phone,
                company: company,
                email: email,
                profession: profession,
                country: this.state.country,
                event_id: this.props.config.uuid
            }, (res) => {
                if(res.status === "error") {
                    Alert.error(res.message)
                    this.setState({
                        submitting: false,
                        submitted: false
                    });
                } else {
                    this.setState({
                        submitting: false,
                        submitted: true
                    });
                }
            },
            (err) => {
                console.log(err);
            })
        }
    }


    countryChange(obj, e) { 
        this.setState({country: obj});
    }

    render() {

        if(this.props.config.status === 0 && this.props.config.streaming_configuration.enable_registration === 0) {
            return (
                <div id="register-form">
                <h3>No necesitas registrarte, por favor regresa cuando el evento haya iniciado.</h3> 
                <Form fluid>
                    <List>
                        <List.Item>
                            <b> Nombre del evento: </b>{this.props.config.name}
                        </List.Item>
                        <List.Item>
                            <b> Fecha del evento: </b>{this.props.config.fecha}
                        </List.Item>
                        <List.Item>
                            <b>Hora del evento:</b> {this.props.config.hora}
                        </List.Item>
                        <List.Item>
                            <b>Duración del evento:</b> {this.props.config.duracion} hora
                        </List.Item>
                    </List>
                </Form>
                </div>
            );
        }

        if(this.state.submitted) {
            return (
                <div id="register-form">
                <h3 className="thanks-register">Gracias por registrarte al evento.</h3> 
                <Form fluid>
                    <List>
                        <List.Item>
                            <b> Nombre del evento: </b>{this.props.config.name}
                        </List.Item>
                        <List.Item>
                            <b> Fecha del evento: </b>{this.props.config.fecha}
                        </List.Item>
                        <List.Item>
                            <b>Hora del evento:</b> {this.props.config.hora}
                        </List.Item>
                        <List.Item>
                            <b>Duración del evento:</b> {this.props.config.duracion} hora
                        </List.Item>
                        <List.Item>
                            <AddToCalendar event={this.state.calendar} buttonLabel="Agregar al calendario" />
                        </List.Item>
                    </List>
                    <ButtonToolbar>
                        <Button appearance="primary" className="button-thanks" block onClick={this.backToLogin}>Regresar a Login</Button>
                    </ButtonToolbar>
                </Form>
                </div>
            );
        }

        return (
            <div id="register-form">
                <Form fluid onSubmit={this.submitAssistance}>
                    <div>
                        <p style={{float: 'right'}}>   <img src={DigitalEventLogo2} alt="Evento Digital 2" width="100px" max-width="100%"></img></p>
                        <h2>Regístrate</h2>
                    </div>
                    <br></br>
                    <img src={this.props.config.logo && this.props.config.logo !== "" ? "https://admin.imcloser.live/storage/" + this.props.config.logo : DigitalEventLogo} alt="Evento Digital" width="250px" max-width="100%" />
                    <br></br>
                    <br></br>
                    <h4>22 Julio 2021 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| 7:00 am - 1:00 PM</h4>
                    <FormGroup>
                        <FormControl name="name" id="registered_name" placeholder="Nombre Completo" />
                    </FormGroup>
                    <FormGroup>
                        <FormControl name="email" type="email" id="registered_email" placeholder="Correo Electrónico" />
                    </FormGroup>
                    <FormGroup>
                        <FormControl name="email" type="email" id="registered_confirm_email" placeholder="Confirmación Correo Electrónico" />
                    </FormGroup>
                    <FormGroup>
                        <FormControl name="email" type="text" id="registered_company" placeholder="Farmacia" />
                    </FormGroup>
                    <FormGroup>
                        <SelectPicker data={[
                            {label: "Guatemala", value: "Guatemala"},
                            {label: "Honduras", value: "Honduras"},
                        ]} style={{ width: "100%" }} onChange={this.countryChange} placeholder="Pais" />
                    </FormGroup>
                    <FormGroup>
                        {this.state.submitting ? 
                            <Loader type="line-scale" active /> 
                        :
                            <ButtonToolbar>
                                <Button appearance="primary" block onClick={this.submitAssistance}>Regístrate</Button>
                            </ButtonToolbar>
                        }
                        
                    </FormGroup>
                </Form>
            </div>
        );
    }

}

export default withRouter(Assistance);