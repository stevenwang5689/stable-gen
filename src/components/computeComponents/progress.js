import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import { MContext } from "../provider";
import { Typography, Box } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import StopIcon from '@material-ui/icons/Stop';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";

const TerminateButton = withStyles({
    root: {
        backgroundColor: "#000000",
        color: "#FFFFFF",
    }
})(Button);

export const ProgressBar = (props) => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress && (
            <MContext.Consumer>
                {(context) => (
                    <div className="spinner">
                        <Loader type="MutatingDots" color="#f50057" height={100} width={100} />
                        <Typography variant="overline" display="block" gutterBottom> Current configuration: <Box display="inline" color={blue} fontWeight="fontWeightBold">{context.state.progress_count} </Box></Typography>
                        <Typography variant="overline" display="block" gutterBottom> Attempting to find a configuration with <Box display="inline" color={blue} fontWeight="fontWeightBold">{context.state.progress_k}</Box> polymers...</Typography>
                        <br/>
                        <TerminateButton type="button"
                            variant="contained"
                            disabled={context.state.disable_terminate || context.state.task_id === ""}
                            onClick={() => context.onClickTerminateHandler()}
                            endIcon={<StopIcon />}>
                            Terminate
                        </TerminateButton>
                    </div>
                )}
            </MContext.Consumer>
        )
    );
};