import React, { Component, Fragment } from 'react';
import Input from "./input";
import Output from "./output";

import '../../App.css';
import Grid from '@material-ui/core/Grid';
import Alerts from './snackbar';
import ControlPanel from './controlPanel';
import { ProgressBar } from './progress';

class Compute extends Component {
    state = {  }
    render() { 
        return ( 
            <Fragment>                
                <div style={{overflowY:"hidden", overflowX:"hidden"}}>
                    <Grid container spacing={2} justify="space-around" alignItems="stretch" className="Content">
                        <Grid item xs={12} sm={6}>
                            <Input />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ControlPanel/>
                            <ProgressBar />
                            <Output />
                        </Grid>
                    </Grid>
                </div>
                <Alerts />
            </Fragment>
        );
    }
}
 
export default Compute;