import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

class Compute extends Component {
  constructor(props) {
    super(props);
      this.state = {
        inputData: null,
        inputConstraints: null,
        gen: 1,
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
      gen: event.target.value
    })
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
      }
      dataReader.readAsText(this.state.inputData)
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
    return (
      <Fragment>
        <br/>
        <Grid container spacing={10} justify="center" alignItems="center">
          <Grid item>
            <Grid container spacing={3} direction="column" alignItems="center">
              <Grid item>
                <Button variant="contained" component="label" color="primary">
                  Upload Data
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={this.onDataChangeHandler}
                  />
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" component="label" color="primary">
                  Upload Constraints
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={this.onConstraintsChangeHandler}
                  />
                </Button>
              </Grid>
              <Grid item>
                <TextField value={this.state.gen} onChange={this.handleGenChange}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button type="button" variant="contained" color="secondary" onClick={this.onClickHandler}>
              Compute
            </Button>
          </Grid>
        </Grid>

        <h1> {listItems} </h1>
      </Fragment>
    );
  }
}

export default Compute;
