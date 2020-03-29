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
import Avatar from '@material-ui/core/Avatar';

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
                                        <Chip
                                            className="Chip-spacing"
                                            variant="outlined" 
                                            color="secondary" 
                                            label={monomer.join(" ")} 
                                        />
                                    )
                                });
                                return(
                                    <Fragment>
                                        <Grid item>
                                            <Card>
                                                <CardContent className="Output">
                                                    {monomers}
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