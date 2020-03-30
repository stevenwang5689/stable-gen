import React, { Component, Fragment } from 'react';
import {MContext} from "../provider";

import '../../App.css';
import Result from "./result";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GetAppIcon from '@material-ui/icons/GetApp';

class Output extends Component {
    state = {  }
    render() { 
        return (
            <Fragment>
                <MContext.Consumer>
                    {(context) => (
                        <Grid container spacing={3} direction="column">
                            {(context.state.entropy !== 0) && (
                            <Grid item>
                                <Card>
                                    <CardContent className="Output">
                                        <Typography variant="subtitle1"> Entropy: {context.state.entropy} </Typography> 
                                        <Typography variant="subtitle1"> Configuration Count: {context.state.count} </Typography> 
                                    </CardContent>
                                </Card>
                            </Grid>)}
                            {(context.state.result.length !== 0) && ( 
                            <Grid item>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Button type="button" variant="outlined" color="secondary" onClick={(event) => context.onClickDownloadHandler(event)} startIcon={<GetAppIcon />}>
                                            Download Output
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            )}
                            <Grid item>
                                <Grid container style={{maxHeight: 500, overflow: 'auto'}}>
                                    <Grid item sm={12}>
                                        <Result />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </MContext.Consumer>
            </Fragment>
         );
    }
}
 
export default Output;