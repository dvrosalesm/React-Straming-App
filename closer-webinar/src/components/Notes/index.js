import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { API } from "../../core/API";
import { Auth } from "../../core/Auth";
import { Alert } from "rsuite";
import draftToHtml from "draftjs-to-html";
import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./style.scss";

import SendMailIcon from "../../assets/send-mail-icon.svg";

class Notes extends Component {
  constructor() {
    super();
    this.state = { editorState: EditorState.createEmpty(), sentEmail: false };
    this.onChange = (editorState) => this.setState({ editorState });
    this.sendNotesToEmail = this.sendNotesToEmail.bind(this);
  }

  sendNotesToEmail() {
    this.setState({
      sentEmail: true,
    });
    let cu = Auth.getCurrentUser();
    if (cu !== null) {
      let blocks = convertToRaw(this.state.editorState.getCurrentContent());
      let markup = draftToHtml(blocks);
      API.sendNotes(
        {
          email: cu.email,
          notas: markup,
        },
        (res) => {
          Alert.success("Notas enviadas correctamente");
        },
        (err) => {
          Alert.error(
            "Hubo un problema al enviar las notas, intente mas tarde."
          );
        }
      );
    }
  }

  render() {
    return (
      <div id="webinar-notes">

      </div>
    );
  }
}

export default Notes;
