import React, {Component} from 'react';
import {FlexboxGrid} from 'rsuite';
import './style.scss';
import SendMailIcon from '../../assets/send-mail-icon.svg';

class Documents extends Component {

    constructor() {
        super();

        this.renderDocuments = this.renderDocuments.bind(this);
    }

    onHandleDownload(download) {
        window.open("https://admin.imcloser.live/storage/" + download, "_blank");
    }

    renderDocuments() {
        return this.props.documents.map( i => {
            let doc = JSON.parse(i.document.replaceAll('\\', "").split("]")[0] + "]")[0];
            return <FlexboxGrid className="single-document" onClick={() => this.onHandleDownload(doc.download_link)}>
                    <FlexboxGrid.Item colspan={24}>
                        <img src={SendMailIcon} alt="Descargar imagen" />
                        <span> {doc.original_name} </span>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
        });
    }

    render() {
        return (
            <div id="webinar-documents">
               
            </div>
        );
    }

}

export default Documents;