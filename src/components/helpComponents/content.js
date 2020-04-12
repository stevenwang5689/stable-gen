import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import tbn from "../../images/TBN.jpeg";
import tbnExample from "../../images/TBNExample.jpeg";
import tbn1 from "../../images/TBN1.jpeg";
import tbn2 from "../../images/TBN2.jpeg";
import tbn3 from "../../images/TBN3.jpeg";

import inputExample1 from "../../images/InputExample1.png";
import inputExample2 from "../../images/InputExample2.png";
import logo from "../../images/logo.png";

import "./styles.css";

class Content extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.myAboutRef = React.createRef();
    this.myTBNRef = React.createRef();
    this.myExRef = React.createRef();
    this.myFormatRef = React.createRef();
    this.myConstraintRef = React.createRef();
    this.myGenRef = React.createRef();
    this.myPolyRef = React.createRef();
    this.myTRef = React.createRef();
    this.myNTRef = React.createRef();
    this.myFRef = React.createRef();
    this.myNFRef = React.createRef();
    this.myPRef = React.createRef();
    this.myNPRef = React.createRef();
    this.myAPRef = React.createRef();
    this.myNAPRef = React.createRef();
  }

  scrollTo = item => {
    switch (item.name) {
      case "about":
        this.myAboutRef.current.scrollIntoView();
        return;
      case "tbn":
        this.myTBNRef.current.scrollIntoView();
        return;
      case "ex":
        this.myExRef.current.scrollIntoView();
        return;
      case "format":
        this.myFormatRef.current.scrollIntoView();
        return;
      case "constraints":
        this.myConstraintRef.current.scrollIntoView();
        return;
      case "gen":
        this.myGenRef.current.scrollIntoView();
        return;
      case "polymer":
        this.myPolyRef.current.scrollIntoView();
        return;
      case "together":
        this.myTRef.current.scrollIntoView();
        return;
      case "nt":
        this.myNTRef.current.scrollIntoView();
        return;
      case "free":
        this.myFRef.current.scrollIntoView();
        return;
      case "nf":
        this.myNFRef.current.scrollIntoView();
        return;
      case "paired":
        this.myPRef.current.scrollIntoView();
        return;
      case "np":
        this.myNPRef.current.scrollIntoView();
        return;
      case "ap":
        this.myAPRef.current.scrollIntoView();
        return;
      case "nap":
        this.myNAPRef.current.scrollIntoView();
        return;
      default:
        return;
    }
  };

  render() {
    return (
      <Container fluid maxWidth="false" className="content-main">
        <img src={logo} alt="test" className="logo"></img>
        <h1 className="content-heading" ref={this.myAboutRef}>
          Uses of StableGen
        </h1>
        <p className="content-body">
          <i>StableGen</i> is a tool primarily for synethtic biologists that
          allows users to:
          <ul>
            <li>
              <span>
                Find stable configurations of{" "}
                <b>Thermodynamic Binding Networks (TBN)</b>
              </span>
            </li>
            <li>
              <span>
                <strong>Visualize</strong> input monomers and output configurations of
                the system
              </span>
            </li>
            <li>
              <span>
                <strong> Add constraints</strong> to the system to give the user more
                control over the input monomers
              </span>
            </li>
          </ul>
        </p>
        <hr className="hr-content" />
        <h1 className="content-heading" ref={this.myTBNRef}>
          What is a TBN?
        </h1>
        <p className="content-body">
          A Thermodynamic Binding Network (TBN) model is an effective way to
          represent chemical systems in a standardized format for modeling and
          simulation. A TBN is composed of individual monomers that have one or
          more binding sites that can bind with the binding sites of other
          monomers. TBNs have <strong>two properties</strong>:
          <ul>
            <li>
              <span>
                Complementary binding sites across monomers will bind together
                to form <b>polymers</b>.{" "}
              </span>
            </li>
            <li>
              <span>
                The TBN Problem tends towards a state of <b>maximum entropy</b>,
                when the monomers are arranged in a way that maximizes the
                number of bonds and the number of separate polymers formed. This
                is known as a<b> stable-state configuration</b>. A configuration
                that maximizes that number of bonds but <i>not</i> the number of
                separate polymers is known as a <b>saturated configuration</b>.
              </span>
            </li>
          </ul>
        </p>
        <hr className="hr-content" />
        <h1 className="content-heading" ref={this.myExRef}>
          TBN Example
        </h1>
        <p className="content-body">
          The following three images display an example of a TBN and two
          possible binding configurations: a <strong>saturated configuration</strong> and a 
          <strong> stable configuration</strong>.
        </p>
        <div className="content-div">
          <figure className="content-figure">
            <img className="content-image-scaled" src={tbn1} alt="TBN1" />
            <figcaption className="content-caption">
              The TBN above consists of <strong>four monomers</strong>: two monomers with one
              binding site and two monomers with two binding sites.
            </figcaption>
          </figure>
          <figure className="content-figure">
            <img className="content-image-scaled" src={tbn2} alt="TBN2" />
            <figcaption className="content-caption">
              The configuration above shows an example of a{" "}
              <b>saturated configuration</b> for the TBN because the
              configuration maximizes the number of bonds formed but not the
              number of polymers formed.
            </figcaption>
          </figure>
          <figure className="content-figure">
            <img className="content-image-scaled" src={tbn3} alt="TBN3" />
            <figcaption className="content-caption">
              This shows a<b> stable-state configuration</b> because the
              configuration maximizes the number of bonds and polymers formed.
              The entropy of the system is <strong>three</strong> as there are three
              polymers formed.{" "}
            </figcaption>
          </figure>
        </div>
        <hr className="hr-content" />
        <h1
          className="content-heading"
          id="input-format"
          ref={this.myFormatRef}
        >
          Input Format
        </h1>
        <div className="content-div">
          <p className="content-body">
            In the input, each <strong>line</strong> represents a <b>monomer</b> and each
            <strong> space-delineated token</strong> represents a <b>binding site</b>. In the example
            shown below,
            <ul>
              <li>
                <span>Monomer 1 has two binding sites: a* and b*</span>
              </li>
              <li>
                <span>Monomer 2 has two binding sites: a and b</span>
              </li>
              <li>
                <span>Monomer 3 has one binding site: a</span>
              </li>
              <li>
                <span>Monomer 4 has one binding site: b</span>
              </li>
            </ul>
          </p>
          <p className="content-highlight2">
            a* b* <br />
            a b <br />
            a* <br />
            b*
          </p>
        </div>
        <div className="content-div">
          <p className="content-body">
            There is also an option to label the inputs to be used in
            constraints. To label a binding site, use a <strong>colon</strong>
            <b> (:)</b> followed by the <strong> binding site label</strong> you would like. To label
            a monomer, use a <strong>{"greater than sign"}</strong> <b> (>)</b> followed by the
            <strong> monomer label</strong>. In the example shown below,
            <ul>
              <li>
                <span>
                  Monomer 1 has two binding sites: a* (labeled b1) and b*
                </span>
              </li>
              <li>
                <span>
                  Monomer 2 (labeled m1) has two binding sites: a and b (labeled
                  b2)
                </span>
              </li>
              <li>
                <span>Monomer 3 (labeled m2) has one binding site: a</span>
              </li>
              <li>
                <span>Monomer 4 has one binding site: b</span>
              </li>
            </ul>
          </p>
          <p className="content-highlight2">
            a*:b1 b* <br />
            a b:b2 >m1
            <br />
            a* >m2
            <br />
            b*
          </p>
        </div>
        <hr className="hr-content" />
        <h1
          className="content-heading"
          id="constraints-format"
          ref={this.myConstraintRef}
        >
          Constraints
        </h1>
        <h2 className="content-heading2" ref={this.myTRef}>
          Together
        </h2>
        <p className="content-body">
          Specifying <b>TOGETHER</b> attempts to force the specified monomers to bind
          into a polymer:
        </p>
        <p className="content-highlight">
          &emsp;{"TOGETHER {m1} {m2} {m3} ..."}
        </p>
        <h2 className="content-heading2" ref={this.myNTRef}>
          Not Together
        </h2>
        <p className="content-body">
          Specifying <b>NOTTOGETHER</b> prevents two monomers from being in the same
          polymer:
        </p>
        <p className="content-highlight">&emsp;{"NOTTOGETHER {m1} {m2}"}</p>
        <h2 className="content-heading2" ref={this.myFRef}>
          Free
        </h2>
        <p className="content-body">
          Specifying <b>FREE</b> attempts to force the specified monomer to not bind to
          any other monomer:
        </p>
        <p className="content-highlight">&emsp;{"FREE {m1}"}</p>
        <h2 className="content-heading2" ref={this.myNFRef}>
          Not Free
        </h2>
        <p className="content-body">
          Specifying <b>NOTFREE</b> forces specified monomer to bind to any other
          monomer
        </p>
        <p className="content-highlight">&emsp;{"NOTFREE {m1}"}</p>
        <h2 className="content-heading2" ref={this.myPRef}>
          Paired
        </h2>
        <p className="content-body">
          Specifying <b>PAIRED</b> attempts to force two binding sites to bind
          together:
        </p>
        <p className="content-highlight">&emsp;{"PAIRED {b1} {b2}"}</p>
        <h2 className="content-heading2" ref={this.myNPRef}>
          Not Paired
        </h2>
        <p className="content-body">
          Specifying <b>NOTPAIRED</b> prevents two binding sites from binding together:
        </p>
        <p className="content-highlight">&emsp;{"NOTPAIRED {b1} {b2}"}</p>
        <h2 className="content-heading2" ref={this.myAPRef}>
          Any Paired
        </h2>
        <p className="content-body">
          Specifying <b>ANYPAIRED</b> forces a binding site to bind to some other
          binding site:
        </p>
        <p className="content-highlight">&emsp;{"ANYPAIRED {b1}"}</p>
        <h2 className="content-heading2" ref={this.myNAPRef}>
          Not Any Paired
        </h2>
        <p className="content-body">
          Specifying <b>NOTANYPAIRED</b> attempts to force the specified binding site
          to not bind to any other binding site:
        </p>
        <p className="content-highlight">&emsp;{"NOTANYPAIRED {b1}"}</p>
        <hr className="hr-content" />
        <h1 className="content-heading">Advanced Features</h1>
        <h2 className="content-heading2" ref={this.myGenRef}>
          Number of Configurations
        </h2>
        <p className="content-body">
          The <b>number of configurations</b> box will attempt to generate n stable
          configurations with the specified constraints if it is possible. If
          there are less than n stable configurations, then it will begin
          finding configurtions with n-1 polymers.
        </p>
        <h2 className="content-heading2" ref={this.myPolyRef}>
          Minimum Polymers
        </h2>
        <p className="content-body">
          If you are certain that there will be at least a certain number of
          polymers, specifying the <b>minimum number of polymers</b> will greatly speed
          up calculations.
        </p>
      </Container>
    );
  }
}

export default Content;
