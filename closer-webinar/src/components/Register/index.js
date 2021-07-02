import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Button, ButtonToolbar, Alert, List, SelectPicker} from 'rsuite';
import { API } from '../../core/API';
import DigitalEventLogo from '../../assets/logo-digital.png';
import {withRouter} from 'react-router-dom';
import './style.scss';
var Loader = require('react-loaders').Loader;

class Assistance extends Component {
    
    constructor() {
        super();

        this.state = {
            country: null,
            submitting: false,
            submitted: false
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
        let lastname = document.getElementById('registered_lastname').value;
        let phone = document.getElementById('registered_phone').value;
        let company = document.getElementById('registered_company').value;
        let email = document.getElementById('registered_email').value;
        let profession = document.getElementById('registered_profession').value;
    
        if(name.trim() === "" || email.trim() === "" || lastname.trim() === "" ||
        phone.trim() === "" || company.trim() === "" || profession.trim() === "" || this.state.country === null) {
            Alert.error("Todos los campos son requeridos.")
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
                    <h2>Regístrate</h2>
                    <h3>Evento lanzamiento</h3>
                    <img src={this.props.config.logo && this.props.config.logo !== "" ? "https://admin.imcloser.live/storage/" + this.props.config.logo : DigitalEventLogo} alt="Evento Digital" />
                    <h4>19 noviembre 2020 | 19:00 horas</h4>
                    <FormGroup>
                        <FormControl name="name" id="registered_name" placeholder="Nombre" />
                    </FormGroup>
                    <FormGroup>
                        <FormControl name="name" id="registered_lastname"placeholder="Apellido"  />
                    </FormGroup>
                    <FormGroup>
                        <FormControl name="email" type="email" id="registered_email" placeholder="Email" />
                    </FormGroup>
                    <FormGroup>
                        <FormControl name="email" type="text" id="registered_phone" placeholder="Teléfono" />
                    </FormGroup>
                    <FormGroup>
                        <FormControl name="email" type="text" id="registered_company" placeholder="Empresa" />
                    </FormGroup>
                    <FormGroup>
                        <FormControl name="email" type="text" id="registered_profession" placeholder="Especialidad" />
                    </FormGroup>
                    <FormGroup>
                        <SelectPicker data={[
                            {label: "Guatemala", value: "Guatemala"},
                            {label: "El Salvador", value: "El Salvador"},
                            {label: "Honduras", value: "Honduras"},
                            {label: "Nicaragua", value: "Nicaragua"},
                            {label: "Costa Rica", value: "Costa Rica"},
                            {label: "Panamá", value: "Panamá"},
                        ]} style={{ width: "100%" }} onChange={this.countryChange} placeholder="Pais" />
                    </FormGroup>
                    <FormGroup>
                        {this.state.submitting ? 
                            <Loader type="line-scale" active /> 
                        :
                            <ButtonToolbar>
                                <Button appearance="primary" block onClick={this.submitAssistance}>Registro</Button>
                            </ButtonToolbar>
                        }
                        
                    </FormGroup>
                </Form>
            </div>
        );
    }

}

export default withRouter(Assistance);