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
import Button from '@material-ui/core/Button';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import GetAppIcon from '@material-ui/icons/GetApp';

class Result extends Component {
    state = { }

    onClickCopy = (polymers) => {
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
    }

    onClickDownload = (polymers) => {
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
                                        return (                              
                                            <Chip
                                                className="Chip-spacing"
                                                variant={bindingsites.indexOf('>') > -1 ? "default" : "outlined"}
                                                color="secondary" 
                                                label={bindingsites} 
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
                                                <Typography> Configuration {index+1} ({config.polymers_count} polymers)</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <Grid container spacing={2} direction="column">
                                                    <Grid item>
                                                        <Grid container spacing={2} justify="flex-end">
                                                            <Grid item>
                                                                <Button type="button" size="small" variant="outlined" color="secondary" onClick={() => this.onClickCopy(config.polymers)}  startIcon={<FileCopyIcon/>}>
                                                                    Copy
                                                                </Button>
                                                            </Grid>
                                                            <Grid item>
                                                                <Button type="button" size="small" variant="outlined" color="secondary" onClick={() => this.onClickDownload(config.polymers)}   startIcon={<GetAppIcon/>}>
                                                                    Download
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item>
                                                        <Grid container spacing={2}>
                                                            {listOfPolymers}
                                                        </Grid>
                                                    </Grid>
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