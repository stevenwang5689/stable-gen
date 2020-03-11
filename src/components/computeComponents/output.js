import React, { Component, Fragment } from 'react';
import {MContext} from "../provider";

import Result from "./result";
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
import axios from 'axios';

class Output extends Component {
    state = {  }
    render() { 
        return (
            <Fragment>
                <MContext.Consumer>
                    {(context) => (
                        <Grid container direction="column">
                            {(context.state.result.length !== 0) && ( 
                            <Grid item>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Button type="button" variant="outlined" color="secondary" onClick={(event) => context.onClickDownloadHandler(event)} startIcon={<GetAppIcon />}>
                                            Download Output
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            )}
                            <Grid item>
                                <Grid container style={{maxHeight: 500, overflow: 'auto'}}>
                                    <Grid item>
                                        <Result />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </MContext.Consumer>
            </Fragment>
         );
    }
}
 
export default Output;