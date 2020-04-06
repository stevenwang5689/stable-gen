import React, { Component } from 'react';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';


export const MContext = React.createContext();  //exporting context object

class Provider extends Component {

  state = {
    inputData: null,
    inputDataText: "",
    inputConstraints: null,
    inputConstraintsText: "",
    gen: 1,
    minPolymers: 1,

    // for snackbar alerts
    dataMissingFlag: false,
    errorMessage: null,
    noOutputFlag: false,
    completeFlag: false,

    calculating: false,

    // to display output
    displayFlag: false,
    toggleView: true,

    // output
    result: [],
    entropy: 0,
    count: 0,
  }

  onExampleChangeHandler = (event) => {
      const exampleName = event.target.value;

      const inputPath = process.env.PUBLIC_URL + "/example_inputs/" + exampleName + "/input.txt";
      const constraintsPath = process.env.PUBLIC_URL + "/example_inputs/" + exampleName + "/constraints.txt";

      fetch(inputPath)
          .then(res => res.text())
          .then(text => {
            console.log(text)
            this.setState({inputDataText: text})
          });

      fetch(constraintsPath)
          .then(res => res.text())
          .then(text => this.setState({inputConstraintsText: text}));

  }
  onDataChangeHandler = (event) => {
    const dataFileReader = new FileReader()
    const inputFile = event.target.files[0];
    dataFileReader.onload = async (e) => {
      this.setState({
        inputData: inputFile,
        inputDataText: e.target.result
      })
    }
    dataFileReader.readAsText(inputFile)
  }

  onDataTextChangeHandler = (event) => {
    this.setState({
      inputDataText: event.target.value
    })
  }

  onConstraintsChangeHandler = (event) => {
    const constraintsFileReader = new FileReader()
    const inputFile = event.target.files[0];
    constraintsFileReader.onload = async (e) => {
      this.setState({
        inputConstraints: inputFile,
        inputConstraintsText: e.target.result
      })
    }
    constraintsFileReader.readAsText(inputFile)
  }

  onConstraintsTextChangeHandler = (event) => {
    this.setState({
      inputConstraintsText: event.target.value
    })
  }

  onClearDataHandler = () => {
    console.log("Hello");
    this.setState({
      inputData: null,
      inputDataText: ""
    })
  }

  onClearConstraintsHandler = () => {
    this.setState({
      inputConstraints: null,
      inputConstraintsText: ""
    })
  }

  handleControlChange = (target, event) => {
    this.setState({
      // only allow integers
      [target]: event.target.value.replace(/\D/, '')
    })
  }

  handleCallback = (target) => {
    if (target === "dataMissingFlag") {
      this.setState({
        dataMissingFlag: false
      })
    } else if (target === "errorMessage") {
      this.setState({
        errorMessage: null
      })
    } else if (target === "noOutputFlag") {
      this.setState({
        noOutputFlag: false
      })
    } else if (target === "completeFlag") {
      this.setState({
        completeFlag: false
      })
    }
  }

  onClickComputeHandler = () => {
    var dataJson
    var constraintsJson
    var inputJson

    this.setState({
      calculating: true,
      displayFlag: false
    })

    // read constraint file
    if (this.state.inputConstraintsText) {
      var constraints = this.state.inputConstraintsText.split("\n")
      constraintsJson = constraints.map((constraint) => {
        return constraint.split(" ")
      })
    }

    if (this.state.inputDataText) {
      // read data file
      var monomers = this.state.inputDataText.split("\n")
      dataJson = monomers.map((monomer) => {
        return monomer.split(" ")
      })
      inputJson = JSON.stringify({
        monomers: dataJson,
        constraints: constraintsJson,
        gen: Number(this.state.gen),
        init_k: Number(this.state.minPolymers)
      })
      // invoke API
      trackPromise(
        axios.post("http://198.23.133.106:5005/", inputJson, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          // handle response
          .then((data) => {
            var jsonResponse = JSON.parse(data.request.response)
            console.log(jsonResponse.configs)
            this.setState({
              result: jsonResponse.configs,
              entropy: jsonResponse.entropy,
              count: jsonResponse.count,
              calculating: false,
              noOutputFlag: jsonResponse.configs.length === 0,
              completeFlag: true,
              displayFlag: true
            })
          })
          .catch(error => {
            // Will not have status if timed out or other network error
            var errMessage = "Request timed out! Please reference documentation on how to run problem locally.";
            if (error.response) {
              errMessage = error.response.data.error.message
            }
            this.setState({
              calculating: false,
              errorMessage: errMessage
            })
          })
      );
    } else {
      this.setState({
        calculating: false,
        dataMissingFlag: true
      })
    }
  }

  render() {
    return (
      <MContext.Provider value={
        {
          state: this.state,
          handleToggle: () => this.setState({ toggleView: !this.state.toggleView }),
          onDataChangeHandler: (event) => this.onDataChangeHandler(event),
          onDataTextChangeHandler: (event) => this.onDataTextChangeHandler(event),
          onConstraintsChangeHandler: (event) => this.onConstraintsChangeHandler(event),
          onConstraintsTextChangeHandler: (event) => this.onConstraintsTextChangeHandler(event),
          handleControlChange: (target, event) => this.handleControlChange(target, event),
          setFlagState: (target) => this.handleCallback(target),
          onClickComputeHandler: () => this.onClickComputeHandler(),
          onExampleChangeHandler: (event) => this.onExampleChangeHandler(event),
          onClearDataHandler: () => this.onClearDataHandler(),
          onClearConstraintsHandler: () => this.onClearConstraintsHandler(),
        }
      }>
        {this.props.children}
      </MContext.Provider>)
  }
}

export default Provider;