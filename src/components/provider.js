import React, { Component } from 'react';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

export const MContext = React.createContext();  //exporting context object

const API_URL = "https://stablegen.net/api";
// const API_URL = "http://198.23.133.106:5005";
// const API_URL = "http://localhost:5005";
const API_TASK = API_URL + "/task";
const API_STATUS = API_URL + "/status/";
const API_TERM = API_URL + "/terminate/";

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
    terminatedFlag: false,

    // for API calls
    task_id: "",
    progress_count: 0,
    progress_k: 0,
    calculating: false,
    disable_terminate: true,

    // to display output
    displayFlag: false,
    toggleView: true,
    generated: false,
    advancedFeatures: false,

    // output
    result: [],
    entropy: 0,
    count: 0,
  }

  componentDidMount() {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('input')) {
      let input = urlParams.get('input')
      this.setState({
        inputDataText: input
      })
    }
    if (urlParams.has('constraints')) {
      let constraints = urlParams.get('constraints')
      this.setState({
        inputConstraintsText: constraints
      })
    }
    window.history.pushState("object or string", "Title", "/" );
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

  onGenBlur = () => {
    if (this.state.gen <= 0) {
      this.setState({
        gen: 1
      })
    }
  }

  handleControlChange = (target, event) => {
    this.setState({
      // only allow integers
      [target]: event.target.value.replace(/\D/, '')
    })
  }

  handleAdvancedFeatures = () => {
    this.setState({
      advancedFeatures: !this.state.advancedFeatures,
      minPolymers: 1,
      gen: 1,
    })
  }

  handleCallback = (target) => {
    if (target === "dataMissingFlag") {
      this.setState({
        dataMissingFlag: false
      })
    } else if (target === "errorMessage") {
      this.setState({
        errorMessage: null,
        terminatedFlag: false,
      })
    } else if (target === "noOutputFlag") {
      this.setState({
        noOutputFlag: false
      })
    } else if (target === "completeFlag") {
      this.setState({
        completeFlag: false
      })
    } else if (target === "terminatedFlag") {
      this.setState({
        terminatedFlag: false
      })
    }
  }

  onClickComputeHandler = () => {
    var dataJson
    var constraintsJson
    var inputJson

    this.setState({
      calculating: true,
      displayFlag: false,
      disable_terminate: false,
      progress_count: 0,
      progress_k: 0,
      task_id: ""
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
        axios.post(API_TASK, inputJson, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          // handle response
          .then(async (data) => {
            var jsonResponse = JSON.parse(data.request.response)
            this.setState({
              task_id: jsonResponse.task_id
            })

            // Long poll while still calculating
            await this.asyncPollingStatus();

          })
          .catch(error => {
            // Only for network error
            var errMessage = "Unexpected Server error occurred, please try again.";
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

  // Asynchronous polling
  asyncPollingStatus = async () => {
    while (this.state.calculating) {
      await new Promise(r => setTimeout(r, 500));
      this.pollingStatus();
    }
  }

  // Long Polling for Status of Task!
  pollingStatus = () => {
    axios.get(API_STATUS + this.state.task_id, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      // handle response
      .then((data) => {
        var jsonResponse = JSON.parse(data.request.response)
        
        if (data.status == 200) {
          this.setState({
            result: jsonResponse.configs,
            entropy: jsonResponse.entropy,
            count: jsonResponse.count,
            calculating: false,
            noOutputFlag: jsonResponse.configs.length === 0,
            completeFlag: true,
            displayFlag: true,
            generated: true,
          })
        }
        else if (data.status == 202) {
          this.setState({
            progress_count: jsonResponse.count,
            progress_k: jsonResponse.k
          })
        }
      })
      .catch(error => {
        // Only for network error
        var errMessage = "Unexpected Server error occurred, please try again.";
        if (error.response) {
          errMessage = error.response.data.message
          if (error.response.data.status === "Timeout") {
            errMessage += " during configuration count [" + this.state.progress_count + "], attempting to find minimum polymers [" + this.state.progress_k + "]."
          }
        }
        this.setState({
          calculating: false,
          errorMessage: errMessage
        })
      });
  }

  onClickTerminateHandler = () => {
    axios.delete(API_TERM + this.state.task_id, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      // handle response
      .then((data) => {
        var jsonResponse = JSON.parse(data.request.response);
        this.setState({
          disable_terminate: true,
          terminatedFlag: true,
        })
      })
      .catch(error => {
        // Only for network error
        var errMessage = "Unexpected Server error occurred, please try again.";
        if (error.response) {
          errMessage = error.response.data.message
        }
      });
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
          onGenBlur: (event) => this.onGenBlur(),
          handleControlChange: (target, event) => this.handleControlChange(target, event),
          setFlagState: (target) => this.handleCallback(target),
          onClickComputeHandler: () => this.onClickComputeHandler(),
          onClickTerminateHandler: () => this.onClickTerminateHandler(),
          onExampleChangeHandler: (event) => this.onExampleChangeHandler(event),
          onClearDataHandler: () => this.onClearDataHandler(),
          onClearConstraintsHandler: () => this.onClearConstraintsHandler(),
          handleAdvancedFeatures: () => this.handleAdvancedFeatures(),
        }
      }>
        {this.props.children}
      </MContext.Provider>)
  }
}

export default Provider;