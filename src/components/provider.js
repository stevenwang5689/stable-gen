import React, { Component } from 'react';
import axios from 'axios';

export const MContext = React.createContext();  //exporting context object

class Provider extends Component {

    state = {
        inputData: null,
        inputConstraints: null,
        gen: 1,
        minPolymers:1,
  
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
        console.log(event.target.files[0])
        this.setState({
          inputData: event.target.files[0]
        })
      }
    
    onConstraintsChangeHandler = (event) => { 
        this.setState({
          inputConstraints: event.target.files[0]
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
            inputJson = JSON.stringify({
                monomers: dataJson, 
                constraints: constraintsJson, 
                gen: Number(this.state.gen),
                init_k: Number(this.state.minPolymers)
            })
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
        return (
            <MContext.Provider value={
                {
                    state: this.state, 
                    setMessage: (value) => this.setState({message: value}),
                    onDataChangeHandler: (event) => this.onDataChangeHandler(event),
                    onConstraintsChangeHandler: (event) => this.onConstraintsChangeHandler(event),
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