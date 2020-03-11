import React, { Component, Fragment } from 'react';
import {MContext} from "../provider";

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
                        <Grid container spacing={3} justify="center">
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={3} justify="center">
                                    <Grid item>
                                        <TextField variant="outlined" label="Number of Generations" value={context.state.gen} onChange={(event) => context.handleControlChange("gen", event)}/>
                                    </Grid>
                                    <Grid item>
                                        <TextField variant="outlined" label="Minimum Polymers" value={context.state.minPolymers} onChange={(event) => context.handleControlChange("minPolymers", event)}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button type="button" variant="contained" color="secondary" onClick={() => context.onClickComputeHandler()} endIcon={<SendIcon />}>
                                    Compute
                                </Button>
                            </Grid>
                        </Grid>
                    </Fragment>
                )}
            </MContext.Consumer>
         );
    }
}
 
export default ControlPanel;