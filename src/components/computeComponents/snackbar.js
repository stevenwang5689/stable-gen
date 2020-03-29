import React, { Component, Fragment } from 'react';
import {MContext} from "../provider";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Alerts extends Component {
    render() { 
        return (
            <MContext.Consumer>
                {(context) => (
                    <Fragment>
                        <Snackbar open={context.state.dataMissingFlag} autoHideDuration={2000} onClose={() => context.setFlagState("dataMissingFlag")}>
                            <Alert onClose={() => context.setFlagState("dataMissingFlag")} severity="error">
                                Input file is empty!
                            </Alert>
                        </Snackbar>

                        <Snackbar open={context.state.errorMessage} autoHideDuration={2000} onClose={() => context.setFlagState("errorMessage")}>
                            <Alert onClose={() => context.setFlagState("errorMessage")} severity="error">
                                {context.state.errorMessage}
                            </Alert>
                        </Snackbar>

                        <Snackbar open={context.state.noOutputFlag} autoHideDuration={2000} onClose={() => context.setFlagState("noOutputFlag")}>
                            <Alert onClose={() => context.setFlagState("noOutputFlag")} severity="error">
                                No result satisifies current condition.
                            </Alert>
                        </Snackbar>

                    </Fragment>
                )}
            </MContext.Consumer>
        );
    }
}
 
export default Alerts;