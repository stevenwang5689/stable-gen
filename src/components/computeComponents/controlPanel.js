import React, { Component, Fragment } from 'react';
import {MContext} from "../provider";

import '../../App.css';


import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';


class ControlPanel extends Component {

    render() {

        return (
            <MContext.Consumer>
                {(context) => (
                    <Fragment>
                        <Grid container spacing={3} justify="space-evenly" alignItems="center" className = "Control-panel">
                            <Grid item xs={6}>
                                <Grid container spacing={3} justify="center">
                                    <Grid item>
                                        <FormControl >
                                            <NativeSelect
                                                name="example"
                                                onChange={(event) => context.onExampleChangeHandler(event)}
                                            >
                                                <option value="" disabled selected>
                                                    Example Inputs
                                                </option>
                                                <option value={"and_gate_2_input"}>2 Input And Gate</option>
                                                <option value={"and_gate_3_input"}>3 Input And Gate</option>

                                            </NativeSelect>
                                            <FormHelperText>Select an Example Input to try it out!</FormHelperText>
                                        </FormControl>

                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={3} justify="center">
                                    <Grid item>
                                        <TextField 
                                            variant="outlined" 
                                            color="secondary" 
                                            label="Number of Generations" 
                                            required defaultValue={1} 
                                            value={context.state.gen===null ? 1:context.state.gen} 
                                            onChange={(event) => context.handleControlChange("gen", event)}
                                            onBlur={() => context.onGenBlur()}
                                            />
                                    </Grid>
                                    <Grid item>
                                        <TextField 
                                            variant="outlined" 
                                            color="secondary" 
                                            label="Minimum Polymers" 
                                            defaultValue={1} 
                                            value={context.state.minPolymers===null ? 1:context.state.minPolymers} 
                                            onChange={(event) => context.handleControlChange("minPolymers", event)}
                                            />
                                    </Grid>
                                    <Grid item>
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
                        </Grid>
                    </Fragment>
                )}
            </MContext.Consumer>
         );
    }
}
 
export default ControlPanel;