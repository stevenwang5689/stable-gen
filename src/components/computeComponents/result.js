import React, { Component, Fragment } from 'react';
import {MContext} from "../provider";

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

class Result extends Component {
    state = {  }
    render() { 
        return (
            <Fragment>
                <MContext.Consumer>
                    {(context) => (
                        context.state.result.map((config, index) => {
                            var listOfPolymers = config.polymers.map((polymers) => {
                                var monomers = polymers.map(monomer => {
                                    return(
                                    <p> {monomer.join(" ")} </p>
                                    )
                                });
                                return(
                                    <Fragment>
                                        <Grid item>
                                            <Card>
                                                <CardContent>
                                                    {monomers}
                                                    <br/>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Fragment>
                                )
                            })
                            return( 
                                <Fragment>
                                    {(config.polymers_count !== 0) && (
                                        <ExpansionPanel defaultExpanded={true}>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography> Configuration {index+1} ({config.polymers_count} polymers)</Typography>
                                                </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <Grid container spacing={2}>
                                                    {listOfPolymers}
                                                </Grid>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    )}
                                </Fragment>
                            )
                        })
                    )}
                </MContext.Consumer>
            </Fragment>
         );
    }
}
 
export default Result;