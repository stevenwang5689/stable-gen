import React, { Fragment } from "react";
import './App.css';
import Home from "./components/home"
import About from "./components/about"
import Compute from "./components/compute"
import Error from "./components/error"
import { Route, Switch, Link, BrowserRouter } from "react-router-dom"

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
  
    
function App() {

    return (
        <BrowserRouter>
            <div className = "App">
            <Route
                path = "/"
                render = {({ location }) => (
                    <Fragment>
                        <h2> StableGEN</h2>
                        <Tabs value = {location.pathname} centered variant="fullWidth">
                            <Tab label = "Home" value = "/" component = {Link} to = '/' />
                            <Tab label = "Compute" value = "/compute" component = {Link} to = '/compute' />
                            <Tab label = "About" value = "/about" component = {Link} to = '/about' />
                        </Tabs>
                        
                        <Switch>
                            <Route path = '/compute' component={Compute} />
                            <Route path = '/about' component={About} />
                            <Route path = '/' component={Home} />
                            <Route component={Error} />
                        </Switch>
                    </Fragment>
                )}
            />
            </div>
        </BrowserRouter>
    )
}

export default App;
