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
                        <Snackbar open={context.state.dataMissingFlag} autoHideDuration={5000} onClose={() => context.setFlagState("dataMissingFlag")}>
                            <Alert onClose={() => context.setFlagState("dataMissingFlag")} severity="error">
                                Input file is empty!
                            </Alert>
                        </Snackbar>

                        <Snackbar open={context.state.errorMessage} onClose={() => context.setFlagState("errorMessage")}>
                            <Alert onClose={() => context.setFlagState("errorMessage")} severity="error">
                                {context.state.errorMessage}
                            </Alert>
                        </Snackbar>

                        <Snackbar open={context.state.noOutputFlag} onClose={() => context.setFlagState("noOutputFlag")}>
                            <Alert onClose={() => context.setFlagState("noOutputFlag")} severity="error">
                                No result satisifies current condition.
                            </Alert>
                        </Snackbar>

                        <Snackbar open={context.state.completeFlag} autoHideDuration={5000} onClose={() => context.setFlagState("completeFlag")}>
                            <Alert onClose={() => context.setFlagState("completeFlag")} severity="success">
                                Computation successfully completed.
                            </Alert>
                        </Snackbar>

                        <Snackbar open={context.state.terminatedFlag && !context.state.errorMessage} autoHideDuration={5000} onClose={() => context.setFlagState("terminatedFlag")}>
                            <Alert onClose={() => context.setFlagState("terminatedFlag")} severity="info">
                                Computation has been terminated.
                            </Alert>
                        </Snackbar>

                    </Fragment>
                )}
            </MContext.Consumer>
        );
    }
}
 
export default Alerts;