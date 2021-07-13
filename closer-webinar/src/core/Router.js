import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Webinar from '../pages/Webinar';
import Register from '../pages/Register';
import Privacy from '../pages/Privacy';

function Router() {
    return (
        <BrowserRouter basename="/">
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/webinar/:closerId" component={Webinar}></Route>
                <Route exact path="/webinar/:closerId/register" component={Register}></Route>
                <Route exact path="/webinar/:closerId/privacy/:country" component={Privacy}></Route>
                <Route exact path="/webinar/:closerId/privacy" component={Privacy}></Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
    