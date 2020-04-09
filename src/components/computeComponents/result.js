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
import Chip from '@material-ui/core/Chip';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import GetAppIcon from '@material-ui/icons/GetApp';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';

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
                                        var formatedBindingSites = 
                                            <span>
                                                <p>
                                                    <Chip 
                                                        className="Chip-spacing"
                                                        size="small"
                                                        label = {<strong>{bindingsites.split('>')[1]}</strong>}
                                                        color="secondary"
                                                        variant="default"
                                                    />
                                                    {bindingsites.split('>')[0]}
                                                </p>
                                            </span>
                                        return (                              
                                            <Chip
                                                className="Chip-spacing"
                                                variant="outlined"
                                                color="secondary" 
                                                label={bindingsites.indexOf('>') > -1 ? formatedBindingSites : bindingsites}
                                            />
                                        )
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
                                                        <Typography> Configuration {index+1} ({config.polymers_count} polymers)</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Grid container spacing={2} justify="flex-end">
                                                            <Grid item>
                                                                <IconButton size="small" color="secondary" onClick={(e) => this.onClickCopy(config.polymers, e)}>
                                                                    <FileCopyIcon/>    
                                                                </IconButton>
                                                            </Grid>
                                                            <Grid item>
                                                                <IconButton size="small" color="secondary" onClick={(e) => this.onClickDownload(config.polymers, e)}>
                                                                    <GetAppIcon/>
                                                                </IconButton>
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