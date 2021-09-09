import React, {Component} from 'react';
import {EditorState, convertToRaw} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import {API} from '../../core/API';
import {Auth} from '../../core/Auth';
import {Alert} from 'rsuite';
import draftToHtml from 'draftjs-to-html';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.scss';

import SendMailIcon from '../../assets/send-mail-icon.svg';

class Notes extends Component {

    constructor() {
        super();
        this.state = {editorState: EditorState.createEmpty(), sentEmail: false};
        this.onChange = editorState => this.setState({editorState});
        this.sendNotesToEmail = this.sendNotesToEmail.bind(this);
    }

    sendNotesToEmail() {
        this.setState({
            sentEmail: true
        });
        let cu = Auth.getCurrentUser();
        if(cu !== null) {
            let blocks = convertToRaw(this.state.editorState.getCurrentContent());
            let markup = draftToHtml(
                blocks
            );
            API.sendNotes({
                email: cu.email,
                notas: markup
            }, (res) => {
                Alert.success("Notas enviadas correctamente");
            }, (err) => {
                Alert.error("Hubo un problema al enviar las notas, intente mas tarde.");
            } )
        }
    }

    render() {

        return (
            <div id="webinar-notes">
                <h3>Toma tus notas y envíatelas por correo </h3> 
                {
                    !this.state.sentEmail ?
                        <button className="send-notes" onClick={this.sendNotesToEmail}>
                            <img src={SendMailIcon} alt="Send email" />
                            Solo envia una vez
                        </button>
                    : null
                }
                <div className="note-draft">
                    <Editor
                        editorState={this.state.editorState}
                        onEditorStateChange={this.onChange}    
                        toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        fontFamily: { options: ['Poppins']}
                        }}
                        localization={{
                            locale: 'es',
                        }}
                        placeholder="Escribe tus apuntes en esta sección..."
                    />
                </div>
            </div>
        )

    }

}

export default Notes;