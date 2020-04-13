import React, { Component } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Grid, Box, Step, Stepper, StepLabel, StepConnector } from '@material-ui/core';
import '../../App.css';
import { blue } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";

const ColoredStepper = withStyles({
    root: {
        backgroundColor: "#FFF6F3",
        margin: 0,
        padding: 0,
    }
})(Stepper);

class Instruction extends Component {
    state = {  }
    render() { 
        return ( 
            <Grid container justify="center">
                <Grid item>
                    <Card>
                        <CardContent className="Output">
                            <Typography gutterBottom variant="h5">
                                Welcome to {" "}
                                <Typography gutterBottom variant="h4" display="inline">
                                    <Box display="inline" letterSpacing={2} color={blue} fontWeight="fontWeightLight">
                                        StableGen
                                    </Box>
                                </Typography>
                                ,   
                            </Typography>

                            <Typography gutterBottom variant="subtitle1"> 
                                <Box fontStyle="italic" m={1}>
                                    a tool to compute stable configurations of Thermodynamic Binding Networks (TBN). 
                                </Box>                       
                            </Typography>
                            <Typography variant="body2" align="left" style={{ paddingTop: 1}}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    Instructions: 
                                </Box>
                                 <ColoredStepper orientation="vertical" connector={<StepConnector style={{ padding: '0', height: '0', visibility:'hidden'}}/>}>
                                    <Step key={1} active = {true}>
                                        <StepLabel>
                                            <Box fontWeight="fontWeightMedium" m={1}>
                                                Type or upload your input under <Box display="inline" color={blue} fontWeight="fontWeightBold"> TBN Input </Box> text box.
                                            </Box>
                                        </StepLabel>
                                    </Step>
                                    <Step key={2} active = {true}>
                                        <StepLabel>
                                            <Box fontWeight="fontWeightMedium" m={1}>
                                                <Box display="inline" fontStyle="italic">(Optional)</Box> Type or upload any additional constraints under <Box display="inline" color={blue} fontWeight="fontWeightBold"> Optional Constriants </Box> text box.
                                            </Box>                           
                                        </StepLabel>
                                    </Step>
                                    <Step key={3} active = {true}>
                                        <StepLabel>
                                            <Box fontWeight="fontWeightMedium" m={1}>
                                                <Box display="inline" fontStyle="italic">(Optional)</Box> Turn on <Box display="inline" color={blue} fontWeight="fontWeightBold"> Advanced Features </Box> toggle to specify number of configurations / minimum polymers.
                                            </Box>
                                        </StepLabel>
                                    </Step>
                                    <Step key={4} active = {true}>
                                        <StepLabel>
                                            <Box fontWeight="fontWeightMedium" m={1}>
                                                Click <Box display="inline" color={blue} fontWeight="fontWeightBold"> Generate </Box> button to compute the stable configurations of your input.
                                            </Box>
                                        </StepLabel>
                                    </Step>
                                </ColoredStepper>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Button component={ Link } to="/help">Learn More</Button>
                                </Grid>
                            </Grid>                       
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            
         );
    }
}
 
export default Instruction;