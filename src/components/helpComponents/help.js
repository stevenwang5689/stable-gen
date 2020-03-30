import React, { Component, Fragment } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Sidebar from "./sidebar.js";
import Content from "./content.js";
import Grid from "@material-ui/core/Grid";

function onClick(e, item) {
  window.alert(JSON.stringify(item, null, 2));
}

class Help extends Component {
  constructor(props) {
    super(props);
    this.contentElement = React.createRef();
    this.onClickSidebar = this.onClickSidebar.bind(this);

    this.sidebarItems = [
      {
        name: "about",
        label: "About the Problem",
        onClick: this.onClickSidebar
      },
      { name: "tbn", label: "What is a TBN?", onClick: this.onClickSidebar },
      { name: "ex", label: "TBN Example", onClick: this.onClickSidebar },
      { name: "format", label: "Input Format", onClick: this.onClickSidebar },
      {
        name: "constraints",
        label: "Constraints",
        items: [
          { name: "together", label: "Together", onClick: this.onClickSidebar },
          { name: "nt", label: "Not Together", onClick: this.onClickSidebar },
          { name: "free", label: "Free", onClick: this.onClickSidebar },
          { name: "nf", label: "Not Free", onClick: this.onClickSidebar },
          { name: "paired", label: "Paired", onClick: this.onClickSidebar },
          { name: "np", label: "Not Paired", onClick: this.onClickSidebar },
          { name: "ap", label: "Any Paired", onClick: this.onClickSidebar },
          { name: "nap", label: "Not Any Paired", onClick: this.onClickSidebar }
        ]
      },
      {
        name: "gen",
        label: "Number Generations",
        onClick: this.onClickSidebar
      },
      {
        name: "polymer",
        label: "Minumum Polymers",
        onClick: this.onClickSidebar
      }
    ];
  }

  onClickSidebar = (e, item) => this.contentElement.current.scrollTo(item);

  state = {};
  render() {
    return (
      <Fragment>
        <div>
          <Grid container spacing={2} justify="center" alignItems="stretch">
            <Grid item xs={3} sm={2}>
              <Sidebar items={this.sidebarItems} />
            </Grid>
            <Grid item xs={9} sm={6}>
              <Content ref={this.contentElement} />
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default Help;
