import React, { Component } from 'react';
import axios from 'axios';

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
    inputInvalidFlag: false,
    noOutputFlag: false,

    // for circular progress 
    calculating: false,

    tabIndex: 0,

    result: []
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
    } else if (target === "inputInvalidFlag") {
      this.setState({
        inputInvalidFlag: false
      })
    } else if (target === "noOutputFlag") {
      this.setState({
        noOutputFlag: false
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
      axios.post("http://localhost:5005/", inputJson, {
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
            calculating: false,
            noOutputFlag: jsonResponse.configs.length === 0
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