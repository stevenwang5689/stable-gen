import React from "react";
import { Route, Switch } from "react-router-dom";
import Help from "./components/helpComponents/help";
import About from "./components/about";
import Compute from "./components/computeComponents/compute";
import Error from "./components/error";

export default function Routes() {
    return (
        <Switch>
            <Route path="/help" exact component={Help} />
            <Route path="/about" exact component={About} />
            <Route path="/" exact component={Compute} />
            <Route component={Error} />
        </Switch>
    );
}