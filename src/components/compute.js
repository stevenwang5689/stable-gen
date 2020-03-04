import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class Compute extends Component {
  constructor(props) {
    super(props);
      this.state = {
        selectedFile: null,
        polymers: []
      }
  }

  onChangeHandler=event=>{ 
      this.setState({
        selectedFile: event.target.files[0]
      })
  }

  onClickHandler = () => {
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      console.log(text)
      axios.post("http://localhost:5005/", text,{
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      .then((data) => {
        var jsonResponse = JSON.parse(data.request.response)

        this.setState({
          polymers: jsonResponse.configs
        })
    })
    };
    reader.readAsText(this.state.selectedFile);
    
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
      <div>
        <br/>
        <Button variant="contained" component="label" color="primary">
          Upload File
          <input
            type="file"
            style={{ display: "none" }}
            onChange={this.onChangeHandler}
          />
        </Button>
        <Button type="button" color="secondary" onClick={this.onClickHandler}>Compute</Button>

        <h1> {listItems} </h1>
      </div>
    );
  }
}

export default Compute;
