import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class Compute extends Component {
  constructor(props) {
    super(props);
      this.state = {
        selectedFile: null
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
      axios.post("http://localhost:5005", text,{
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      .then(function (response) {
        console.log(response);
      })
    };
    reader.readAsText(this.state.selectedFile);
  }

  render() {
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
      </div>
    );
  }
}

export default Compute;
