import React, { Fragment } from "react";
import './App.css';
import Help from "./components/help"
import About from "./components/about"
import Compute from "./components/computeComponents/compute"
import Error from "./components/error"
import { Route, Switch, Link, BrowserRouter } from "react-router-dom"

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';

import logo from './images/logo.png';
 
const LogoToNavigate = ({ history }) => (
    <img src={logo} onClick={() => history.push('/')} className= "Logo"/>
);
  
const Logo = () => (
    <Route path="/" render={(props) => <LogoToNavigate {...props} />} />
)    

function App() {

    return (
        <BrowserRouter>
            <div className = "App">
            <Route
                path = "/"
                render = {({ location }) => (
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container justify="space-between" alignItems="center" className = "App-header">
                                <Grid item>
                                    <Logo/>
                                </Grid>
                                <Grid item>
                                    <Tabs value = {location.pathname} >
                                        <Tab label = "Help" value = "/help" component = {Link} to = '/help' />
                                        <Tab label = "About" value = "/about" component = {Link} to = '/about' />
                                    </Tabs>
                                </Grid>
                            </Grid>
                        <Grid/>
                        <Grid item>
                            <Switch>
                                <Route path = '/help' component={Help} />
                                <Route path = '/about' component={About} />
                                <Route path = '/' component={Compute} />
                                <Route component={Error} />
                            </Switch>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            />
            </div>
        </BrowserRouter>
    )
}

export default App;
