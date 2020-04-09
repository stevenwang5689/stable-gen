import React from "react";

import Paper from '@material-ui/core/Paper';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Routes from "./Routes"
import logo from "./images/logo.png";
import { Route, Link, BrowserRouter } from "react-router-dom";
import { withStyles, withTheme} from "@material-ui/core/styles";
import Provider from './components/provider.js';

import "./App.css";

const LogoToNavigate = ({ history }) => (
  <img src={logo} alt="StableGen" onClick={() => history.push("/")} className="Logo" />
);

const Logo = () => (
  <Route path="/" render={props => <LogoToNavigate {...props} />} />
);

const ColorPaper = withStyles({
  root: {
    color: "black",
    backgroundColor: "#FAFAFA"
  }
})(Paper);

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <div className="App">
          <Route
            path="/"
            render={({ location }) => (
              <Grid container direction="column">
                <Grid container item alignItems="center" justify="space-evenly">
                  <Grid item sm={12} md={4} >
                    <div>
                      <Logo />
                    </div>
                  </Grid>
                  <Grid item sm={12} md={7} >
                    <ColorPaper elevation={3} square>
                      <Tabs variant="fullWidth" indicatorColor="primary" value={location.pathname}>
                        <Tab label="Compute" value="/" component={Link} to="/" />
                        <Tab label="Help" value="/help" component={Link} to="/help" />
                        <Tab label="About" value="/about" component={Link} to="/about" />
                      </Tabs>
                    </ColorPaper>
                  </Grid>
                </Grid>

                <Grid item>
                  <Routes />
                </Grid>
              </Grid>
            )}
          />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
