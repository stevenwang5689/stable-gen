import React, { Component, Fragment } from 'react';
import {MContext} from "../provider";

import '../../App.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';


class ControlPanel extends Component {
    state = {  }
    render() { 
        return ( 
            <MContext.Consumer>
                {(context) => (
                    <Fragment>
                        <Grid container spacing={3} justify="space-evenly" alignItems="center" className = "Control-panel">
                            <Grid item>
                                <Grid container spacing={3} justify="center">
                                    <Grid>
                                        <Button type="button" 
                                                variant="contained" 
                                                color="secondary"
                                                disabled={context.state.calculating} 
                                                onClick={() => context.onClickComputeHandler()} 
                                                endIcon={<SendIcon />}>
                                            Compute
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container spacing={3} justify="center">
                                    <Grid item>
                                        <TextField variant="outlined" color="secondary" label="Number of Generations" required defaultValue={1} value={context.state.gen===null ? 1:context.state.gen} onChange={(event) => context.handleControlChange("gen", event)}/>
                                    </Grid>
                                    <Grid item>
                                        <TextField variant="outlined" color="secondary" label="Minimum Polymers" defaultValue={1} value={context.state.minPolymers===null ? 1:context.state.minPolymers} onChange={(event) => context.handleControlChange("minPolymers", event)}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Fragment>
                )}
            </MContext.Consumer>
         );
    }
}
 
export default ControlPanel;