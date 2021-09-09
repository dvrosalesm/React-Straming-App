import React, {Component} from 'react';
import {MessageBox} from 'react-chat-elements'
import {FormControl, Form} from 'rsuite';
import io from 'socket.io-client';
import { API } from '../../core/API';
import { Auth } from '../../core/Auth';
import './style.scss';
import 'react-chat-elements/dist/main.css';

class Chat extends Component {

    constructor() {
        super();

        this.state = {
            messages: [
                //{ sender: "Diego R", type: "text", message: "Bienvenido al evento demo", owner: false, email: "rdiegovladimir@gmail.com" }
            ]
        }

        this.renderMessages = this.renderMessages.bind(this);
        this.postMessage = this.postMessage.bind(this);
        this.fetchMessages = this.fetchMessages.bind(this);

    }

    renderMessages() {
        let currentUser = Auth.getCurrentUser();
        return this.state.messages.map( i => {
            let position = "left";
            if(i.email && i.email.trim() === currentUser.email) position = "right";
            return <MessageBox title={i.name} position={position} type={i.type}  text={i.message} />
        });
    }

    componentDidMount() {
        const socket = io('https://admin.imcloser.live:4040/');
        socket.on('message', this.fetchMessages)
        this.fetchMessages();
    }

    fetchMessages() {
        console.log('works on emit')
        API.getMessages(this.props.eventId, 
            (res) => {
                this.setState({messages: res});
                let messageWrapper = document.getElementById('messages-wrapper');   
                messageWrapper.scrollTop = messageWrapper.scrollHeight + 100;
            },
            (err) => {
                console.log(err)
            });
    }

    postMessage() {
        let messageElem = document.getElementById('message-closer');
        let message = messageElem.value;
        let currentUser = Auth.getCurrentUser();
        API.postMessage({
            name: currentUser.email,
            email: currentUser.email,
            room: this.props.eventId,
            message: message
        });
        let msg = this.state.messages;
        msg.push(
            { sender: currentUser.email, type: "text", message: message, owner: false, email: currentUser.email }
        );
        this.setState({messages: msg})
        messageElem.value = "";
    }

    render() {
        return (
            <div id="chat" >
                <div className="input-message" >
                    <Form fluid={true} onSubmit={this.postMessage}>
                        <FormControl name="name" id="message-closer" placeholder="Comparte tus preguntas aqui"  />
                    </Form>
                </div>
            </div>
        );
    }

}

export default Chat;