import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import { MContext } from "../provider";

export const ProgressBar = (props) => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress && (
            <MContext.Consumer>
                {(context) => (
                    <div className="spinner">
                        <Loader type="MutatingDots" color="#f50057" height={100} width={100} />
                        <p>Current Count: {context.state.progress_count}</p>
                        <p>Current K: {context.state.progress_k}</p>
                    </div>
                )}
            </MContext.Consumer>
        )
    );
};