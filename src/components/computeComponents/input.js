import React, { Component, Fragment } from 'react';
import {MContext} from "../provider";

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class Input extends Component {
    state = {  }
    render() { 
        return (
            <MContext.Consumer>
                {(context) => (
                    <Fragment>
                        <Grid container spacing={3} direction="column">
                            <Grid item>
                                <Button variant="contained" component="label" color="primary" startIcon={<CloudUploadIcon />}>
                                Upload Data
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={(event) => context.onDataChangeHandler(event)}
                                />
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" component="label" color="primary" startIcon={<CloudUploadIcon />}>
                                Upload Constraints
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={(event) => context.onConstraintsChangeHandler(event)}
                                />
                                </Button>
                            </Grid>
                        </Grid>
                    </Fragment>
                )}
            </MContext.Consumer>
         );
    }
}
 
export default Input;