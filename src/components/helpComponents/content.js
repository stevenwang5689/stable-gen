import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import tbn from "../../images/TBN.jpeg";
import tbnExample from "../../images/TBNExample.jpeg";
import inputExample1 from "../../images/InputExample1.jpeg";
import inputExample2 from "../../images/InputExample2.jpeg";
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
      <Container fluid className="content-main">
        <h1 className="content-heading" ref={this.myAboutRef}>
          About the Problem
        </h1>
        <p className="content-body">
          <i>StableGen</i> predicts stable configurations of{" "}
          <b>Thermodynamic Binding Networks (TBN)</b>. Based on the paper by
          Briek et. al,“Computing properties of stable configurations of
          thermodynamic binding networks,” <i>StableGen </i>
          allows users to input monomers as well as constraints to predict the
          stable configuration which the monomers will bind. This is essentially
          "CAD" for monomers. The representation of binding sites, monomers, and
          polymers that we use is called a Thermodynamic Binding Network.
        </p>
        <br />
        <h1 className="content-heading" ref={this.myTBNRef}>
          What is a TBN?
        </h1>
        <div className="content-div">
          <p className="content-body">
            The Thermodynamic Binding Network (TBN) model is an effective way to
            represent chemical systems in a standardized format for modeling and
            simulation. A TBN is composed of individual monomers that have one
            or more binding sites that can bind with the binding sites of other
            monomers. TBN's have two key properties:
          </p>
          <figure className="content-figure" vertical-align="middle">
            <img
              className="content-image"
              src={tbn}
              alt="TBN"
              vertical-align="middle"
            />
            <figcaption className="content-caption">
              Fig.1 - Thermodynamic Binding Network.
            </figcaption>
          </figure>
        </div>
        <ol className="content-body">
          <li>
            Complementary binding sites across monomers will bind together to
            form polymers.{" "}
          </li>
          <li>
            The TBN Problem tends towards a state of maxumum <b>entropy</b>,
            when the monomers are arranged in a way that maximizes the number of
            bonds and the number of separate polymers formed. This is known as a
            <b> stable-state configuration</b>. A configuration that maximizes
            that number of bonds but <i>not</i> the number of separate polymers
            is known as a <b>saturated configuration</b>.
          </li>
        </ol>
        <br />
        <h1 className="content-heading" ref={this.myExRef}>
          TBN Example
        </h1>
        <div className="content-div">
          <p className="content-body">
            The image on the right shows an example of a TBN, a saturated
            configuration, and a stable configuration. The original problem
            consists of four monomers: two monomers with one binding site and
            two monomers with two binding sites. The situation in the bottom
            left shows an example of a <b>saturated configuration</b>. The
            situation in the bottom left shows a
            <b> stable-state configuration</b>. The entropy of the system is{" "}
            <b>three</b> as there are three monomers formed.
          </p>
          <figure className="content-figure" vertical-align="middle">
            <img
              className="content-image-scaled"
              src={tbnExample}
              alt="TBNExample"
              vertical-align="middle"
            />
            ;
            <figcaption className="content-caption">
              Fig.2 - Thermodynamic Binding Network Example.
            </figcaption>
          </figure>
        </div>
        <br />
        <h1 className="content-heading" ref={this.myFormatRef}>
          Input Foramt
        </h1>
        <p className="content-body">
          <figure className="content-figure" vertical-align="middle">
            <img
              className="content-image"
              src={inputExample1}
              alt="InputEx1"
              vertical-align="middle"
            />
            <figcaption className="content-caption">
              Fig.3 - Input Example.
            </figcaption>
          </figure>
          In the input, each line represents a monomer and each space-delineated
          token represents a binding site. Therefore, if the input is as shown
          in Figure 3, there are four monomers:
          <ul className="content-body">
            <li>Monomer 1 has two binding sites: a* and b*</li>
            <li>Monomer 2 has two binding sites: a and b</li>
            <li>Monomer 3 has one binding site: a</li>
            <li>Monomer 4 has one binding site: b</li>
          </ul>
        </p>
        <p className="content-body">
          <figure className="content-figure" vertical-align="middle">
            <img
              className="content-image"
              src={inputExample2}
              alt="InputEx2"
              vertical-align="middle"
            />
            <figcaption className="content-caption">
              Fig.4 - Input Example.
            </figcaption>
          </figure>
          There is also an option to label the inputs to be used in constraints.
          For example, in Figure 4 on the right
          <ul className="content-body">
            <li>Monomer 1 has two binding sites: a* (labeled b1) and b*</li>
            <li>
              Monomer 2 (labeled m1) has two binding sites: a and b (labeled b2)
            </li>
            <li>Monomer 3 (labeled m2) has one binding site: a</li>
            <li>Monomer 4 has one binding site: b</li>
          </ul>
        </p>
        <h1 className="content-heading" ref={this.myConstraintRef}>
          Constraints
        </h1>
        <h2 className="content-heading2" ref={this.myTRef}>
          Together
        </h2>
        <p className="content-body">
          Specifying TOGETHER attempts to force the specified monomers to bind
          into a polymer:
        </p>
        <p className="content-highlight">
          &emsp;{"TOGETHER {m1} {m2} {m3} ..."}
        </p>
        <h2 className="content-heading2" ref={this.myNTRef}>
          Not Together
        </h2>
        <p className="content-body">
          Specifying NOTTOGETHER prevents two monomers from being in the same
          polymer:
        </p>
        <p className="content-highlight">&emsp;{"NOTTOGETHER {m1} {m2}"}</p>
        <h2 className="content-heading2" ref={this.myFRef}>
          Free
        </h2>
        <p className="content-body">
          Specifying FREE attempts to force the specified monomer to not bind to
          any other monomer:
        </p>
        <p className="content-highlight">&emsp;{"FREE {m1}"}</p>
        <h2 className="content-heading2" ref={this.myNFRef}>
          Not Free
        </h2>
        <p className="content-body">
          Specifying NOTFREE forces specified monomer to bind to any other
          monomer
        </p>
        <p className="content-highlight">&emsp;{"NOTFREE {m1}"}</p>
        <h2 className="content-heading2" ref={this.myPRef}>
          Paired
        </h2>
        <p className="content-body">
          Specifying PAIRED attempts to force two binding sites to bind
          together:
        </p>
        <p className="content-highlight">&emsp;{"PAIRED {b1} {b2}"}</p>
        <h2 className="content-heading2" ref={this.myNPRef}>
          Not Paired
        </h2>
        <p className="content-body">
          Specifying NOTPAIRED prevents two binding sites from binding together:
        </p>
        <p className="content-highlight">&emsp;{"NOTPAIRED {b1} {b2}"}</p>
        <h2 className="content-heading2" ref={this.myAPRef}>
          Any Paired
        </h2>
        <p className="content-body">
          Specifying ANYPAIRED forces a binding site to bind to some other
          binding site:
        </p>
        <p className="content-highlight">&emsp;{"ANYPAIRED {b1}"}</p>
        <h2 className="content-heading2" ref={this.myNAPRef}>
          Not Any Paired
        </h2>
        <p className="content-body">
          Specifying NOTANYPAIRED attempts to force the specified binding site
          to not bind to any other binding site:
        </p>
        <p className="content-highlight">&emsp;{"NOTANYPAIRED {b1}"}</p>
        <br />
        <h1 className="content-heading" ref={this.myGenRef}>
          Number Generations
        </h1>
        <p className="content-body">
          The number of generations box will attempt to generate n stable
          configurations with the specified constraints if it is possible.
        </p>
        <br />
        <h1 className="content-heading" ref={this.myPolyRef}>
          Minimum Polymers
        </h1>
        <p className="content-body">
          If you are certain that there will need be a certain number of
          polymers, specifcying the minumum number of polymers will greatly
          speed up calculations
        </p>
      </Container>
    );
  }
}

export default Content;
