import React, { Component, Fragment } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Alerts extends Component {
    render() { 
        return (
            <Fragment>
                <Snackbar open={this.props.dataMissingFlag} autoHideDuration={2000} onClose={() => this.props.parentCallback("dataMissingFlag")}>
                    <Alert onClose={() => this.props.parentCallback("dataMissingFlag")} severity="error">
                        Data file is empty!
                    </Alert>
                </Snackbar>

                <Snackbar open={this.props.inputInvalidFlag} autoHideDuration={2000} onClose={() => this.props.parentCallback("inputInvalidFlag")}>
                    <Alert onClose={() => this.props.parentCallback("inputInvalidFlag")} severity="error">
                        Input files have incorrect format!
                    </Alert>
                </Snackbar>
            </Fragment>
        );
    }
}
 
export default Alerts;