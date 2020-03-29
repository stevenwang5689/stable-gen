import React, { Component, Fragment } from 'react';
import { MContext } from "../provider";

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';

class Input extends Component {
    state = {}
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
                                            multiline 
                                            rows={10}
                                            placeholder={dataPlaceholderText}
                                            value={context.state.inputDataText}
                                            onChange={context.onDataTextChangeHandler}
                                        />
                                    </FormControl>
                                </Container>
                            </Grid>
                            <br/>
                            <Grid container>
                                <Container>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="contraints-input-field"
                                            label="Constraints"
                                            variant="outlined"
                                            multiline 
                                            rows={10}
                                            value={context.state.inputConstraintsText}
                                            onChange={context.onConstraintsTextChangeHandler}
                                        />
                                    </FormControl>
                                </Container>
                            </Grid>
                        </Grid>
                    </Fragment>
                )}
            </MContext.Consumer>
        );
    }
}

export default Input;