import React, { Component, Fragment } from 'react';
import Provider from "../provider";
import Input from "./input";
import Output from "./output";

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GetAppIcon from '@material-ui/icons/GetApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Alerts from './snackbar';
import ControlPanel from './controlPanel';

class Compute extends Component {
    state = {  }
    render() { 
        return ( 
            <Fragment>
                <Provider>
                    <br />
                    <ControlPanel/>
                    <div>
                        <Grid container spacing={2} justify="space-around" alignItems="stretch">
                            <Grid item xs={12} sm={6}>
                                <Input />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Output />
                            </Grid>
                        </Grid>
                    </div>
                    <Alerts />
                </Provider>
            </Fragment>
        );
    }
}
 
export default Compute;