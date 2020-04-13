import React, { Component, Fragment } from 'react';
import {MContext} from "../provider";

import '../../App.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import { Card, CardContent } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";


const ComputeButton = withStyles({
    root: {
        // backgroundColor: "#D00000", // Comment to modify compute button
    }
})(Button);

class ControlPanel extends Component {
    state = { 
    }

    render() {
        return (
            <MContext.Consumer>
                {(context) => (
                    <Fragment>
                        <Grid id="control" container xs={12} spacing={6} justify="center" alignItems="center">
                            <Grid item>
                                <Card>
                                    <CardContent>                             
                                        <Grid container justify="center" alignItems="center">   
                                            <Grid item>
                                                <FormControlLabel
                                                    control={
                                                        <Switch 
                                                            checked={context.state.advancedFeatures}
                                                            onChange={() => context.handleAdvancedFeatures()}
                                                        />
                                                    }
                                                    label={<Typography variant="caption">Advanced Features</Typography>}
                                                    labelPlacement="bottom"
                                                />
                                            </Grid>           
                                            <Grid item>
                                                <Grid container spacing={2} direction="column">
                                                    <Grid item>
                                                        <TextField 
                                                            type="number"
                                                            variant="outlined" 
                                                            size="small"
                                                            disabled={!context.state.advancedFeatures}
                                                            color="secondary" 
                                                            label="Number of Configurations" 
                                                            defaultValue={1} 
                                                            value={context.state.gen===null ? 1:context.state.gen} 
                                                            onChange={(event) => context.handleControlChange("gen", event)}
                                                            onBlur={() => context.onGenBlur()}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField 
                                                            type="number"
                                                            variant="outlined" 
                                                            size="small"
                                                            disabled={!context.state.advancedFeatures}
                                                            color="secondary" 
                                                            label="Minimum Polymers" 
                                                            defaultValue={1} 
                                                            value={context.state.minPolymers===null ? 1:context.state.minPolymers} 
                                                            onChange={(event) => context.handleControlChange("minPolymers", event)}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>     
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item>
                                <ComputeButton type="button"
                                    size="large"
                                    variant="contained"
                                    color="secondary"
                                    disabled={context.state.calculating}
                                    onClick={() => context.onClickComputeHandler()}
                                    endIcon={<SendIcon />}>
                                    Generate
                                </ComputeButton>
                                
                            </Grid>
                        </Grid>
                    </Fragment>
                )}
            </MContext.Consumer>
         );
    }
}
 
export default ControlPanel;