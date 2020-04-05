import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';

export const Spinner = (props) => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress && (
            <div className="spinner">
                <Loader type="MutatingDots" color= "#f50057" height = {100} width={100} />
            </div>
        )
    );
};