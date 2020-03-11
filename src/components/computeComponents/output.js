import React, { Component, Fragment } from 'react';
import {MContext} from "../provider";

class Output extends Component {
    state = {  }
    render() { 
        return (
            <Fragment>
                <MContext.Consumer>
                    {(context) => (
                        <p>{context.state.message}</p>
                    )}
                </MContext.Consumer>
            </Fragment>
         );
    }
}
 
export default Output;