import React, { Component, Fragment } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GetAppIcon from '@material-ui/icons/GetApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';
import Alerts from './computeComponents/snackbar';

class Computation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputData: null,
      inputConstraints: null,
      gen: 1,

      checkConstraints: false,
      checkGen: false,

      // for snackbar alerts
      dataMissingFlag: false,
      inputInvalidFlag: false,

      // for circular progress 
      calculating: false,

      tabIndex: 0,

      result: []
    }
  }

  onDataChangeHandler = (event) => { 
    this.setState({
      inputData: event.target.files[0]
    })
  }

  onConstraintsChangeHandler = (event) => { 
    this.setState({
      inputConstraints: event.target.files[0]
    })
  }

  handleGenChange = (event) => {
    this.setState({
      // only allow integers
      gen: event.target.value.replace(/\D/, '')
    })
  }

  handleSwitchChange = (target) => event => {
    if (target === "checkConstraints") {
      this.setState({ 
        [target]: event.target.checked,
        constraints: null 
      })
    } else if (target === "checkGen") {
      this.setState({ 
        [target]: event.target.checked,
        gen:1
      })
    }
  }

  handleTabChange = (event, newIndex) => {
    this.setState({
      tabIndex: newIndex,
      result: [],
      inputData: null,
      inputConstraints: null,
      gen: 1
    })
  }

  handleCallback = (target) => {
    if (target === "dataMissingFlag") {
      this.setState({
        dataMissingFlag: false
      })
    } else if (target === "inputInvalidFlag") {
      this.setState({
        inputInvalidFlag: false
      })
    }
  }

  onClickComputeHandler = () => {
    var dataJson
    var constraintsJson
    var inputJson

    this.setState({
      calculating: true
    })

    // read constraint file
    if (this.state.inputConstraints != null) {
      const constraintsReader = new FileReader()
      constraintsReader.onload = async (e) => {
        var constraints = e.target.result.split("\n")
        constraintsJson = constraints.map((constraint) => {
          return constraint.split(" ")
        })
      }
      constraintsReader.readAsText(this.state.inputConstraints) 
    }

    if (this.state.inputData != null) { 
    
      // read data file
      const dataReader = new FileReader()
      dataReader.onload = async (e) => {
        var monomers = e.target.result.split("\n")
        dataJson = monomers.map((monomer) => {
          return monomer.split(" ")
        })
        inputJson = JSON.stringify({monomers: dataJson, constraints: constraintsJson, gen: Number(this.state.gen)})
        // invoke API
        axios.post("http://localhost:5005/", inputJson, {
          headers: {
            'Content-Type' : 'application/json'
          }
        })
        // handle response
        .then((data) => {
          var jsonResponse = JSON.parse(data.request.response)
          this.setState({
            result: jsonResponse.configs,
            calculating: false
          })
        })
        .catch(error => {
          this.setState({
            calculating: false
          })
          if (error.response.status === 403) {
            this.setState({
              inputInvalidFlag: true
            })
          }
        })
      }
      dataReader.readAsText(this.state.inputData)
    } else {
      this.setState({
        dataMissingFlag: true
      })
    }
  }

  onClickDownloadHandler = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(this.state.result)], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "output.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  render() {
    var output = this.state.result.map((config, index) => {
      var listOfPolymers = config.polymers.map((polymers) => {
        var monomers = polymers.map(monomer => {
          return(
            <p> {monomer.join(" ")} </p>
          )
        });
        return(
          <Fragment>
            <Grid item>
              <Card>
                <CardContent>
                  {monomers}
                  <br/>
                </CardContent>
              </Card>
            </Grid>
          </Fragment>
        )
      })
      return( 
        <Fragment>
          {(config.polymers_count !== 0) && (<ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography> Configuration {index+1} ({config.polymers_count} polymers)</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={2}>
                {listOfPolymers}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>)}
        </Fragment>)
    })

    var inputButtons = 
    <Grid container spacing={3} direction="column">
      <Grid item>
        <Button variant="contained" component="label" color="primary" startIcon={<CloudUploadIcon />}>
          Upload Data
          <input
            type="file"
            style={{ display: "none" }}
            onChange={this.onDataChangeHandler}
          />
        </Button>
      </Grid>
      <Grid item>
        <Grid container spacing={3} direction="column" alignItems="flex-start">
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.checkConstraints}
                  onChange={this.handleSwitchChange('checkConstraints')}
                  value="checkConstraints"
                  color="primary"
                />
              }
            />
            <Button variant="contained" component="label" color="primary" startIcon={<CloudUploadIcon />} disabled={!this.state.checkConstraints}>
              Upload Constraints
              <input
                type="file"
                style={{ display: "none" }}
                onChange={this.onConstraintsChangeHandler}
              />
            </Button>
          </Grid>
          <Grid item>
            <FormControlLabel
                control={
                  <Switch
                    checked={this.state.checkGen}
                    onChange={this.handleSwitchChange('checkGen')}
                    value="checkGen"
                    color="primary"
                  />
                }
              />
            <TextField variant="outlined" label="Generations" value={this.state.gen} onChange={this.handleGenChange} disabled={!this.state.checkGen}/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

    var computeButton = 
    <Grid container spacing={2}>
      <Grid item>
        <Button type="button" variant="contained" color="secondary" onClick={this.onClickComputeHandler} endIcon={<SendIcon />}>
          Compute
        </Button>
      </Grid>
      <Grid item>
        {(this.state.calculating) && (<CircularProgress />)}
      </Grid>
    </Grid>

    return (
      <Fragment>
        <br/>
        <Tabs
          value={this.state.tabIndex}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Upload File" />
          <Tab label="Manual Input" />
        </Tabs>
        <br/>

        {(this.state.tabIndex === 0) && (
          <Paper variant="outlined">
            <br/>
            <Grid container spacing={10} justify="center" alignItems="center">
              <Grid item>
                {inputButtons}
              </Grid>
              <Grid item>
                {computeButton}
              </Grid>
            </Grid>
            <br/>
          </Paper>
        )}

        {(this.state.tabIndex === 1) && (
          <h1>
            Coming soon...
          </h1>
        )}

        <br/>
        <Grid container justify="flex-end">
          {(this.state.result.length !== 0) && ( 
            <Grid item>
              <Button type="button" variant="outlined" color="secondary" onClick={this.onClickDownloadHandler} startIcon={<GetAppIcon />}>
                Download Output
              </Button>
            </Grid>
          )}
        </Grid>
        {output}
      </Fragment>
    );
  }
}

export default Computation;
