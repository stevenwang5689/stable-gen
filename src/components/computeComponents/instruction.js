import React, { Component } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Grid, Box } from '@material-ui/core';
import '../../App.css';
import { blue } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

class Instruction extends Component {
    state = {  }
    render() { 
        return ( 
            <Grid container>
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
                            
                            <br/>
                            <Typography gutterBottom variant="body1" align="left">
                                <Box fontWeight="fontWeightBold" m={1}>
                                    Instructions: 
                                </Box>
                                <Box fontWeight="fontWeightMedium" m={1}>
                                    1. Type or upload your input under <Box display="inline" color={blue} fontWeight="fontWeightBold"> TBN Input </Box> text box.
                                </Box>
                                <Box fontWeight="fontWeightMedium" m={1}>
                                    2. <Box display="inline" fontStyle="italic">(Optional)</Box> Type or upload any additional constraints under <Box display="inline" color={blue} fontWeight="fontWeightBold"> Optional Constriants </Box> text box.
                                </Box>
                                <Box fontWeight="fontWeightMedium" m={1}>
                                    3. <Box display="inline" fontStyle="italic">(Optional)</Box> Turn on <Box display="inline" color={blue} fontWeight="fontWeightBold"> Advanced Features </Box> toggle to specify number of configurations / minimum polymers.
                                </Box>
                                <Box fontWeight="fontWeightMedium" m={1}>
                                    4. Click <Box display="inline" color={blue} fontWeight="fontWeightBold"> Generate </Box> button to compute the stable configurations of your input.
                                </Box>
                            </Typography>
                            
                            <br/>
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