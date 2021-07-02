import React, {Component} from 'react';
import {Nav, Navbar, Container, Content, Header, Footer, Icon, FlexboxGrid} from 'rsuite';
import {Link} from 'react-router-dom';
import CommonUtils from '../../core/CommonUtils';

class WebinarLayout extends Component {

    constructor() {
        super();
        this.onHandleSelect = this.onHandleSelect.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }


    onHandleSelect() {

    }

    handleLogout() {
        this.props.handleLogout();
    }

    render() {

        let style = {backgroundImage: 'url(https://admin.imcloser.live/storage/'+this.props.webinarBackground+')'};
        let styleFallback = {backgroundImage: 'url('+CommonUtils.IMAGES.BackgroundDefaultImage+')' };
        return (
            <Container id="webinar-layout" style={ this.props.webinarBackground && this.props.webinarBackground !== '' ? style : styleFallback}>
                {this.props.showHeader ?
                    <Header className="webinar-menu">
                        <Navbar>
                            <Navbar.Header>
                                <Link to="/" className="navbar-brand logo">
                                    <img src={this.props.companyLogo && this.props.companyLogo !== "" ? "https://admin.imcloser.live/storage/" + this.props.companyLogo : CommonUtils.IMAGES.SPLogo} alt="Closer" />
                                </Link>
                            </Navbar.Header>
                            <Navbar.Body>
                                { this.props.hasLoaded ?
                                    <Nav pullRight>
                                        {/* <Nav.Item icon={<Icon icon="calendar" />}>Mis eventos</Nav.Item>
                                        <Nav.Item icon={<Icon icon="user-circle-o" />}>Mi cuenta</Nav.Item> */}
                                        <Nav.Item icon={<Icon icon="sign-out" />} className="exit-event" onClick={this.handleLogout} >Salir del evento</Nav.Item>
                                    </Nav>
                                : null}
                            </Navbar.Body>
                        </Navbar>
                    </Header>
                : null}
                <Content className="webinar-content">
                    <FlexboxGrid justify="center">
                        {this.props.showHeader ?
                            <FlexboxGrid.Item colspan={20} sm={24} className="with-header">
                                {this.props.children}
                            </FlexboxGrid.Item>
                        : 
                            <FlexboxGrid.Item colspan={20} sm={24}>
                                {this.props.children}
                            </FlexboxGrid.Item>
                        }
                    </FlexboxGrid>
                </Content>
                <Footer justify="center" className="closer-footer">
                    StudioPensabene | Derechos Reservados {new Date().getFullYear()} 
                </Footer>
            </Container>
        );
    }

}

export default WebinarLayout;