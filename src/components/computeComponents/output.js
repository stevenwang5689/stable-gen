import React, { Component, Fragment } from 'react';
import {MContext} from "../provider";

import '../../App.css';
import Result from "./result";
import Instruction from "./instruction";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class Output extends Component {
    state = {  }
    render() { 
        return (
            <Fragment>
                <MContext.Consumer>
                    {(context) => (
                        (context.state.displayFlag === true) ? (
                        <Grid container spacing={3} direction="column">
                            {(context.state.entropy !== 0) && (
                            <Grid item>
                                <Card>
                                    <CardContent className="Output">
                                        <Typography variant="subtitle1"> Unconstrained Entropy: {context.state.entropy} </Typography> 
                                        <Typography variant="subtitle1"> Number of Configurations: {context.state.count} </Typography> 
                                    </CardContent>
                                </Card>
                            </Grid>)}
                            {(context.state.result.length !== 0) && ( 
                            <Grid item>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <FormControlLabel
                                            control={<Switch checked={context.state.toggleView} onChange={() => context.handleToggle()} />}
                                            label={<Typography variant="caption" > {context.state.toggleView ? "Chip View" : "Plain View"} </Typography>}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            )}
                            <Grid item>
                                <Grid container style={{maxHeight: 600, overflow: 'auto'}}>
                                    <Grid item sm={12}>
                                        <Result />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        ) :
                        (!context.state.generated && <Instruction/>)
                    )}
                </MContext.Consumer>
            </Fragment>
         );
    }
}
 
export default Output;