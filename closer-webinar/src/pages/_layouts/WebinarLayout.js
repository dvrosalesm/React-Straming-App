import React, {Component} from 'react';
import {Nav, Navbar, Container, Content, Header, Footer, Icon, FlexboxGrid} from 'rsuite';
import {Link} from 'react-router-dom';
import CommonUtils from '../../core/CommonUtils';
import FooterLogo from '../../assets/footerLogo.png';
import HeaderLogo from '../../assets/headerLogo.png';

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
                <Header>
                    <img src={HeaderLogo} width="100%" />
                </Header>
                {this.props.showHeader ?
                    <Header className="webinar-menu">
                        <Navbar>
                            
                            <Navbar.Body>
                                { this.props.hasLoaded ?
                                    <Nav pullRight>
                                        {/* <Nav.Item icon={<Icon icon="calendar" />}>Mis eventos</Nav.Item>
                                        <Nav.Item icon={<Icon icon="user-circle-o" />}>Mi cuenta</Nav.Item> */}
                                        <Nav.Item  icon={<Icon icon="sign-out" />} className="exit-event" onClick={this.handleLogout} >Salir del evento</Nav.Item>
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
                    <img src={FooterLogo}  top="-500px" width="800px" />
                </Footer>
            </Container>
        );
    }

}

export default WebinarLayout;