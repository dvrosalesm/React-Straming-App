import React, {Component} from 'react';
import DefaultLayout from './_layouts/DefaultLayout';
import {ControlLabel, FlexboxGrid, Form, FormControl, FormGroup, HelpBlock, Icon, ButtonToolbar, Button, Input, Alert, Message} from 'rsuite';
import CommonUtils from '../core/CommonUtils';
import { Fade } from "react-awesome-reveal";
import {API} from '../core/API';
var Loader = require('react-loaders').Loader;

class Home extends Component {

    constructor() {
        super();

        this.state = {
            submitting: false,
            submitted:  false
        }

        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        //this.props.history.push("/webinar/29c23ff4-e5b2-4cda-a634-c7e960decb6c");
    }

    sendMessage() {


        this.setState({
            submitting: true
        });

        var hname = document.getElementById('home_name').value;
        var hemail = document.getElementById('home_email').value;
        var htelephone = document.getElementById('home_telephone').value;
        var hmessage = document.getElementById('home_message').value;   

        if(hname.trim() === "" || hemail.trim() === "" || htelephone === "") {
            Alert.error("Todos los campos son requeridos");
            this.setState({
                submitting: false
            });
        }

        API.sendContactMessage({
            name: hname,
            email: hemail,
            telephone: htelephone,
            message: hmessage
        }, (res) => {
            Alert.success("Mensaje enviado correctamente");
            this.setState({
                submitting: false,
                submitted: true
            });
        }, (err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <DefaultLayout>
                <div id="home-container">
                    <div className="home-hero">
                        <FlexboxGrid>
                            <FlexboxGrid.Item colspan={12} className="home-left">
                                <Fade triggerOnce>
                                    <img src={CommonUtils.IMAGES.HomeLeft} alt="Closer Desk" className="closer-left-img" />    
                                </Fade>
                                <div className="closer-logo-home">
                                    <img src={CommonUtils.IMAGES.CloserLogo} alt="Closer Home" className=""/>
                                </div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={12} className="home-right">
                                <Fade triggerOnce>
                                    <img src={CommonUtils.IMAGES.HomeRight} alt="Closer Desk" />
                                    <Fade triggerOnce cascade>
                                        <div className="headline">
                                            <h1>Nada nos detiene para estar <b>cerca</b></h1>
                                            <p>Videoconferencias profesionales al alcance de todos</p>
                                            <a className="" href="https://admin.imcloser.live/register"><Icon icon="play2" size="sm" /> Regístrate</a>
                                        </div>
                                        <div className="login-wrapper">
                                        <a className="" href="https://admin.imcloser.live/login"><Icon icon="sign-in" size="sm" /> Iniciar sesión</a>
                                        </div>
                                    </Fade>
                                </Fade>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </div>
                    <div className="us-hero">
                        <Fade triggerOnce>
                            <FlexboxGrid>
                                <FlexboxGrid.Item colspan={12} className="home-right">
                                    <img src={CommonUtils.IMAGES.HomeRight} alt="Closer Desk" />
                                    <div className="headline">
                                        <h1>Nosotros</h1>
                                        <p><b>Closer nace con la necesidad de adaptarse al nuevo normal.</b> La comunicación virtual 
                                            es ahora parte de la vida diaria.</p>
                                        <p>Por ello ofrecer una sola solución, que con calidad profesional, permite crear videoconferencias
                                            para evenvtos virtuales.
                                        </p>
                                    </div>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={12} className="home-left">
                                    <img src={CommonUtils.IMAGES.UsRight} alt="Closer Desk" className="closer-left-img" />
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </Fade>
                    </div>
                    <div className="pricing-hero">
                        <Fade triggerOnce>
                            <FlexboxGrid>
                                <FlexboxGrid.Item colspan={12} className="home-left">
                                    <img src={CommonUtils.IMAGES.UsRight} alt="Closer Desk" className="closer-left-img" />
                                </FlexboxGrid.Item>

                                <FlexboxGrid.Item colspan={12} className="home-right">
                                    <img src={CommonUtils.IMAGES.HomeRight} alt="Closer Desk" />
                                    <div className="headline">
                                        <h1>Nuestra solución</h1>
                                        <table className="func">
                                            <tr>
                                                <td> <Icon icon="check" size="sm" /> </td>
                                                <td> Transimisión en <b>720p</b> </td>
                                            </tr>
                                            <tr>
                                                <td> <Icon icon="check" size="sm" /> </td>
                                                <td> <b>Chat</b> grupal de los participantes </td>
                                            </tr>
                                            <tr>
                                                <td> <Icon icon="check" size="sm" /> </td>
                                                <td> Incluye <b>documentos de ayuda</b> en tus presentaciones </td>
                                            </tr>
                                            <tr>
                                                <td> <Icon icon="check" size="sm" /> </td>
                                                <td> Tus participantes pueden crear <b>notas</b> durante el evento </td>
                                            </tr>
                                            <tr>
                                                <td> <Icon icon="check" size="sm" /> </td>
                                                <td> Eventos ilimitados </td>
                                            </tr>
                                            <tr>
                                                <td> <Icon icon="check" size="sm" /> </td>
                                                <td> Grabación de eventos </td>
                                            </tr>
                                            <tr>
                                                <td> <Icon icon="check" size="sm" /> </td>
                                                <td> Reportería de asistentes y registros </td>
                                            </tr>
                                        </table>
                                    </div>
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </Fade>
                    </div>
                    <div className="contact-hero">
                        <Fade triggerOnce>
                            <FlexboxGrid justify="center">
                                <FlexboxGrid.Item colspan="10">
                                    <h1>¡Hablemos!</h1>
                                    <p><b>Dejános un mensaje</b> y nos pondremos en contacto en breve.</p>
                                    {this.state.submitted ? 
                                        <div>
                                            <hr />
                                            <Message type="success" description="Mensaje enviado correctamente"></Message>
                                        </div>
                                    : <Form fluid>
                                        <FormGroup>
                                            <ControlLabel>Nombre</ControlLabel>
                                            <FormControl id="home_name"></FormControl>
                                            <HelpBlock>Requerido</HelpBlock>
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>Email</ControlLabel>
                                            <FormControl id="home_email"></FormControl>
                                            <HelpBlock>Requerido</HelpBlock>
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>Teléfono</ControlLabel>
                                            <FormControl id="home_telephone"></FormControl>
                                            <HelpBlock>Requerido</HelpBlock>
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>Mensaje</ControlLabel>
                                            <Input
                                                componentClass="textarea"
                                                rows={3}
                                                style={{ width: "100%", resize: 'auto' }}
                                                placeholder="Mensaje..."
                                                id="home_message"
                                            />
                                        </FormGroup>
                                        <ButtonToolbar>

                                            {this.state.submitting ? 
                                                <Loader type="line-scale" active /> 
                                            :
                                                <ButtonToolbar>
                                                    <Button appearance="primary" block onClick={this.sendMessage}>Enviar</Button>
                                                </ButtonToolbar>
                                            }
                                        </ButtonToolbar>
                                    </Form>
                                    }
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </Fade>
                    </div>
                </div>
            </DefaultLayout>
        );
    }

}

export default Home;