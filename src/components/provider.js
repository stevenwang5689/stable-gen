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

    // for circular progress 
    calculating: false,

    // to display output
    displayFlag: false,

    // output
    result: [],
    entropy: 0,
    count: 0,
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
            this.setState({
              calculating: false,
              errorMessage: error.response.data.error.message
            })
          })
      );
    } else {
      this.setState({
        dataMissingFlag: true
      })
    }
  }

  onClickDownloadHandler = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(this.state.result)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "output.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  render() {
    return (
      <MContext.Provider value={
        {
          state: this.state,
          setMessage: (value) => this.setState({ message: value }),
          onDataChangeHandler: (event) => this.onDataChangeHandler(event),
          onDataTextChangeHandler: (event) => this.onDataTextChangeHandler(event),
          onConstraintsChangeHandler: (event) => this.onConstraintsChangeHandler(event),
          onConstraintsTextChangeHandler: (event) => this.onConstraintsTextChangeHandler(event),
          handleControlChange: (target, event) => this.handleControlChange(target, event),
          setFlagState: (target) => this.handleCallback(target),
          onClickComputeHandler: () => this.onClickComputeHandler(),
          onClickDownloadHandler: () => this.onClickDownloadHandler()
        }
      }>
        {this.props.children}
      </MContext.Provider>)
  }
}

export default Provider;