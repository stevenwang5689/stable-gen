import React, { Component, Fragment } from "react";
import Sidebar from "./sidebar.js";
import Content from "./content.js";
import Grid from "@material-ui/core/Grid";
import InfoIcon from "@material-ui/icons/Info";
import TuneIcon from "@material-ui/icons/Tune";
import ViewListIcon from "@material-ui/icons/ViewList";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import SettingsIcon from "@material-ui/icons/Settings";
import "./styles.css";

class Help extends Component {
  constructor(props) {
    super(props);
    this.contentElement = React.createRef();
    this.onClickSidebar = this.onClickSidebar.bind(this);

    this.sidebarItems = [
      {
        name: "about",
        label: "About the Problem",
        Icon: InfoIcon,
        onClick: this.onClickSidebar
      },
      {
        name: "tbn",
        label: "What is a TBN?",
        Icon: SpeakerNotesIcon,
        onClick: this.onClickSidebar
      },
      {
        name: "ex",
        label: "TBN Example",
        Icon: BubbleChartIcon,
        onClick: this.onClickSidebar
      },
      {
        name: "format",
        label: "Input Format",
        Icon: ViewListIcon,
        onClick: this.onClickSidebar
      },
      {
        name: "constraints",
        label: "Constraints",
        Icon: SettingsIcon,
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
        name: "additional",
        label: "Addiditional Options",
        Icon: TuneIcon,
        items: [
          {
            name: "gen",
            label: "Number of Configurations",
            onClick: this.onClickSidebar
          },
          {
            name: "polymer",
            label: "Minimum Polymers",
            onClick: this.onClickSidebar
          }
        ]
      }
    ];
  }

  onClickSidebar = (e, item) => this.contentElement.current.scrollTo(item);

  state = {};
  render() {
    return (
      <Fragment>
        <div className="overall-div">
          <Grid container spacing={1} justify="center" alignItems="stretch">
            <Grid item xs={12} sm={2}>
              <Sidebar items={this.sidebarItems} />
            </Grid>
            <Grid item xs={12} sm={9}>
              <Content ref={this.contentElement} />
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default Help;
