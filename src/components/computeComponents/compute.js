import React, { Component, Fragment } from 'react';
import Provider from "../provider";
import Input from "./input";
import Output from "./output";

import '../../App.css';
import Grid from '@material-ui/core/Grid';
import Alerts from './snackbar';
import ControlPanel from './controlPanel';
import { Spinner } from './spinner';

class Compute extends Component {
    state = {  }
    render() { 
        return ( 
            <Fragment>
                <Provider>
                    <div>
                        <Grid container spacing={2} justify="space-around" alignItems="stretch" className="Content">
                            <Grid item xs={12} sm={6}>
                                <Input />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <ControlPanel/>
                                <Spinner />
                                <Output />
                            </Grid>
                        </Grid>
                    </div>
                    <Alerts />
                </Provider>
            </Fragment>
        );
    }
}
 
export default Compute;