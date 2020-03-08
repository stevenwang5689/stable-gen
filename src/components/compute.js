import React, { Component, Fragment } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import Alerts from './snackbar';

class Compute extends Component {
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

      polymers: []
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
  };

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

  onClickHandler = () => {
    var dataJson
    var constraintsJson
    var inputJson

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
        console.log(inputJson)
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
            polymers: jsonResponse.configs
          })
        })
        .catch(error => {
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

  render() {
    var i = 0
    var listItems = this.state.polymers.map((poly) => {
      var listOfPolymers = poly.polymers.map((polymers) => {
        var monomers = polymers.map(monomer => {
          return(
            <p> {monomer} </p>
          )
        });
        return(
          <Fragment>
          <p>{monomers}</p>
          <br/>
          </Fragment>
      )})
      return( <Fragment>
            <h1>Configuration {++i}</h1>
            <p>This configuration has {poly.polymers_count} polymers</p>
            <box>
              {listOfPolymers}
            </box>

            
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

    return (
      <Fragment>
        <br/>
        <Grid container spacing={10} justify="center" alignItems="center">
          <Grid item>
            {inputButtons}
          </Grid>
          <Grid item>
            <Button type="button" variant="contained" color="secondary" onClick={this.onClickHandler} endIcon={<SendIcon />}>
              Compute
            </Button>
          </Grid>
        </Grid>

        <h1> {listItems} </h1>
        <Alerts 
          dataMissingFlag = {this.state.dataMissingFlag}
          inputInvalidFlag = {this.state.inputInvalidFlag}
          parentCallback = {this.handleCallback}
        />
      </Fragment>
    );
  }
}

export default Compute;
