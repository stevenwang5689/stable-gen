import React, { Component, Fragment } from 'react';
import { MContext } from "../provider";

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class Input extends Component {
    state = {
        dataValue: "value"
    }

    onDataChange(event) {
    }

    render() {
        let dataPlaceholderText = 'a* b*\na b\na*\nb*\n';
        return (
            <MContext.Consumer>
                {(context) => (
                    <Fragment>
                        <Grid container direction="column" justify="space-around" alignItems="stretch">
                            <Grid container>
                                <Container>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="data-input-field"
                                            label="TBN Input"
                                            variant="outlined"
                                            multiline rows={10}
                                            placeholder={dataPlaceholderText}
                                            value={context.inputData}
                                        />
                                    </FormControl>
                                </Container>
                            </Grid>
                            <Grid container>
                                <Container>
                                    <FormControl fullWidth fullHeight>
                                        <TextField
                                            id="contraints-input-field"
                                            label="Constraints"
                                            variant="outlined"
                                            multiline rows={10}
                                        />
                                    </FormControl>
                                </Container>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3} direction="column" justify='space-around' alignItems="stretch" fullHeight>
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