import React, { Component, Fragment } from 'react';
import {MContext} from "../provider";

import '../../App.css';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import GetAppIcon from '@material-ui/icons/GetApp';
import Tooltip from "@material-ui/core/Tooltip";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';

import Monomer from './monomer';
import { Box } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Result extends Component {
    state = { 
        copiedFlag: false,
        downloadedFlag: false,
    }

    setFlagState = (target) => {
        if (target === "copiedFlag") {
          this.setState({
            copiedFlag: false
          })
        } else if (target === "downloadedFlag") {
        this.setState({
            downloadedFlag: false
        })
        }
    }

    onClickCopy = (polymers, e) => {
        e.stopPropagation();
        var listOfPolymers = polymers.map(polymer => {
            var monomers = polymer.map(monomer => {
                return monomer.join(" ")
            }) 
            return monomers.join('\n')
        })

        var result = listOfPolymers.join("\n\n")
        
        var input = document.createElement('textarea');
        input.innerHTML = result;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);

        this.setState({
            copiedFlag: true
        })
    }

    onClickDownload = (polymers, e) => {
        e.stopPropagation();
        var listOfPolymers = polymers.map(polymer => {
            var monomers = polymer.map(monomer => {
                return monomer.join(" ")
            }) 
            return monomers.join('\n')
        })

        var result = listOfPolymers.join("\n\n")

        const element = document.createElement("a");
        const file = new Blob([result], { type: 'plain/text'});
        element.href = URL.createObjectURL(file);
        element.download = "output.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();

        this.setState({
            downloadedFlag: true
        })
    }

    render() { 
        return (
            <Fragment>
                <MContext.Consumer>
                    {(context) => (
                        context.state.result.map((config, index) => {
                            var listOfPolymers = config.polymers.map((polymers) => {
                                var monomers = polymers.map(monomer => {
                                    var bindingsites = monomer.join(" ")
                                    if (context.state.toggleView) {
                                        return <Monomer
                                            bindingSites={Monomer.extractBindingSites(bindingsites)}
                                            monomerName={Monomer.extractMonomerName(bindingsites)}
                                            color={"secondary"}
                                        />
                                    } else {
                                        return <p> {bindingsites} </p>
                                    }
                                });

                                return(
                                    <Grid item>
                                        <Card>
                                            <CardContent className="Output">
                                                {monomers}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                                
                            })
                            return( 
                                <Fragment>
                                    {(config.polymers_count !== 0) && (                                 
                                        <ExpansionPanel defaultExpanded={true}>                                      
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                <Grid container justify="space-between">
                                                    <Grid item>
                                                        <Typography> Configuration {index+1} ({config.polymers_count} {config.polymers_count === 1 ? "polymer" : "polymers"}) {config.polymers_count === context.state.entropy && <Typography variant="button" display="inline"><Box display="inline" color={blue} fontWeight="fontWeightBold"> [Stable] </Box> </Typography>}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Grid container spacing={2} justify="flex-end">
                                                            <Grid item>
                                                                <Tooltip 
                                                                    title={<Typography variant="body1" gutterBottom>Copy Configuration</Typography>}
                                                                    placement="top"
                                                                    arrow
                                                                    style={{backgroundColor: "#f5f5f9"}}
                                                                >                                                       
                                                                    <IconButton size="small" color="secondary" onClick={(e) => this.onClickCopy(config.polymers, e)}>
                                                                        <FileCopyIcon/>    
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Grid>
                                                            <Grid item>
                                                                <Tooltip 
                                                                    title={<Typography variant="body1" gutterBottom>Download Configuration</Typography>}
                                                                    placement="top"
                                                                    arrow
                                                                > 
                                                                    <IconButton size="small" color="secondary" onClick={(e) => this.onClickDownload(config.polymers, e)}>
                                                                        <GetAppIcon/>
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <Grid container spacing={2} direction="column">
                                                    
                                                    <Grid item>
                                                        <Grid container spacing={2}>
                                                            {listOfPolymers}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    )}

                                    <Snackbar open={this.state.copiedFlag} autoHideDuration={2000} onClose={() => this.setFlagState("copiedFlag")}>
                                        <Alert onClose={() => context.setFlagState("copiedFlag")} severity="success">
                                            Copied output to clipboard
                                        </Alert>
                                    </Snackbar>
                                    <Snackbar open={this.state.downloadedFlag} autoHideDuration={2000} onClose={() => this.setFlagState("downloadedFlag")}>
                                        <Alert onClose={() => context.setFlagState("downloadedFlag")} severity="success">
                                            Downloaded output as textfile
                                        </Alert>
                                    </Snackbar>
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