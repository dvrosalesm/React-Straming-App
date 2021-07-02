import React, {Component} from 'react';
import {Container, Content, Header, Footer, FlexboxGrid} from 'rsuite';      

class DefaultLayout extends Component {

    render() {
        return (
            <Container id="default-layout">
                <Header className="webinar-menu">
                    
                </Header>
                <Content className="webinar-content">
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={24}>
                            {this.props.children}
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>
                <Footer justify="center" className="closer-footer">
                    Closer Derechos Reservados {new Date().getFullYear()} 
                </Footer>
            </Container>
        );
    }

}

export default DefaultLayout;