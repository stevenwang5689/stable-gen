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
  state = { width: 0, height: 0 };
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

  scrollTo = (item) => {
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
      <Container fluid maxWidth="false" className="content-main" id="main">
        <img src={logo} alt="test" className="logo"></img>
        <h1 className="content-heading" ref={this.myAboutRef}>
          Uses of StableGen
        </h1>
        <p className="content-body">
          <i>StableGen</i> is a tool primarily for researchers in the molecular programming community that allows users to:
          <ul className="ul-content">
            <li className="li-content">
              <span className="li-span-content">
                Find stable configurations of{" "}
                <b>Thermodynamic Binding Networks (TBN)</b>
              </span>
            </li>
            <li className="li-content">
              <span className="li-span-content">
                <strong>Visualize</strong> input monomers and output
                configurations of the system
              </span>
            </li>
            <li className="li-content">
              <span className="li-span-content">
                <strong> Add constraints</strong> to the system to give the user
                more control over the input
              </span>
            </li>
          </ul>
        </p>
        <hr className="hr-content" />
        <h1 className="content-heading" ref={this.myTBNRef}>
          What is a TBN?
        </h1>
        <p className="content-body">
          The Thermodynamic Binding Networks (TBN) model abstracts the thermodynamics 
          of a chemical system as counting the number of bonds and separate complexes.
          A TBN is composed of individual monomers that have one or
          more binding sites that can bind with the binding sites of other
          monomers. TBNs have the following <strong>properties</strong>:
          <ul className="ul-content">
            <li className="li-content">
              <span className="li-span-content">
                Complementary binding sites across monomers will bind together
                to form <b>polymers</b>. A configuration
                that maximizes that number of bonds is known as a <b>saturated configuration</b>.{" "}
              </span>
            </li>
            <li className="li-content">
              <span className="li-span-content">
                We say the entropy of a configuration is the number of separate polymers.
                Among all saturated configurations, 
                the TBN tends towards a state of maximum entropy,
                where the monomers are arranged in a way that maximizes the
                the number of separate polymers formed. This
                is known as a <b>stable configuration</b>. 
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
          possible binding configurations: a{" "}
          <strong>saturated configuration</strong> and a
          <strong> stable configuration</strong>.
        </p>
        <div className="content-div">
          <figure className="content-figure">
            <img className="content-image-scaled" src={tbn1} alt="TBN1" />
            <figcaption className="content-caption">
              The TBN above consists of <strong>four monomers</strong>: two
              monomers with one binding site and two monomers with two binding
              sites.
            </figcaption>
          </figure>
          <figure className="content-figure">
            <img className="content-image-scaled" src={tbn2} alt="TBN2" />
            <figcaption className="content-caption">
              The configuration above shows an example of a{" "}
              <b>saturated configuration</b> for the TBN because the
              configuration maximizes the number of bonds formed.
            </figcaption>
          </figure>
          <figure className="content-figure">
            <img className="content-image-scaled" src={tbn3} alt="TBN3" />
            <figcaption className="content-caption">
              This shows a<b> stable configuration</b> because the
              configuration maximizes the number of bonds <strong>and</strong> polymers formed.
              The entropy of the system is <strong>three</strong> as there are
              three polymers formed.{" "}
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
            In the input, each <strong>line</strong> represents a <b>monomer</b>{" "}
            and each
            <strong> space-delineated token</strong> represents a{" "}
            <b>binding site</b>. In the example shown below,
            <ul className="ul-content">
              <li className="li-content">
                <span className="li-span-content">
                  Monomer 1 has two binding sites: a* and b*
                </span>
              </li>
              <li className="li-content">
                <span className="li-span-content">
                  Monomer 2 has two binding sites: a and b
                </span>
              </li>
              <li className="li-content">
                <span className="li-span-content">
                  Monomer 3 has one binding site: a
                </span>
              </li>
              <li className="li-content">
                <span className="li-span-content">
                  Monomer 4 has one binding site: b
                </span>
              </li>
            </ul>
          </p>
          <p className="content-highlight">
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
            <b> (:)</b> followed by the <strong> binding site label</strong> you
            would like. To label a monomer, use a{" "}
            <strong>{"greater than sign"}</strong> <b> (>)</b> followed by the
            <strong> monomer label</strong>. In the example shown below,
            <ul className="ul-content">
              <li className="li-content">
                <span className="li-span-content">
                  Monomer 1 has two binding sites: a* (labeled b1) and b*
                </span>
              </li>
              <li className="li-content">
                <span className="li-span-content">
                  Monomer 2 (labeled m1) has two binding sites: a and b (labeled
                  b2)
                </span>
              </li>
              <li className="li-content">
                <span className="li-span-content">
                  Monomer 3 (labeled m2) has one binding site: a
                </span>
              </li>
              <li className="li-content">
                <span className="li-span-content">
                  Monomer 4 has one binding site: b
                </span>
              </li>
            </ul>
          </p>
          <p className="content-highlight">
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
          Specifying <b>TOGETHER</b> attempts to force the specified monomers to
          bind into a polymer:
        </p>
        <div className="content-div">
          <p className="content-highlight">
            &emsp;{"TOGETHER {m1} {m2} {m3} ..."}
          </p>
        </div>
        <h2 className="content-heading2" ref={this.myNTRef}>
          Not Together
        </h2>
        <p className="content-body">
          Specifying <b>NOTTOGETHER</b> prevents two monomers from being in the
          same polymer:
        </p>
        <div className="content-div">
          <p className="content-highlight">&emsp;{"NOTTOGETHER {m1} {m2}"}</p>
        </div>
        <h2 className="content-heading2" ref={this.myFRef}>
          Free
        </h2>
        <p className="content-body">
          Specifying <b>FREE</b> attempts to force the specified monomer to not
          bind to any other monomer:
        </p>
        <div className="content-div">
          <p className="content-highlight">&emsp;{"FREE {m1}"}</p>
        </div>
        <h2 className="content-heading2" ref={this.myNFRef}>
          Not Free
        </h2>
        <p className="content-body">
          Specifying <b>NOTFREE</b> forces specified monomer to bind to any
          other monomer:
        </p>
        <div className="content-div">
          <p className="content-highlight">&emsp;{"NOTFREE {m1}"}</p>
        </div>
        <h2 className="content-heading2" ref={this.myPRef}>
          Paired
        </h2>
        <p className="content-body">
          Specifying <b>PAIRED</b> attempts to force two binding sites to bind
          together:
        </p>
        <div className="content-div">
          <p className="content-highlight">&emsp;{"PAIRED {b1} {b2}"}</p>
        </div>
        <h2 className="content-heading2" ref={this.myNPRef}>
          Not Paired
        </h2>
        <p className="content-body">
          Specifying <b>NOTPAIRED</b> prevents two binding sites from binding
          together:
        </p>
        <div className="content-div">
          <p className="content-highlight">&emsp;{"NOTPAIRED {b1} {b2}"}</p>
        </div>
        <h2 className="content-heading2" ref={this.myAPRef}>
          Any Paired
        </h2>
        <p className="content-body">
          Specifying <b>ANYPAIRED</b> forces a binding site to bind to some
          other binding site:
        </p>
        <div className="content-div">
          <p className="content-highlight">&emsp;{"ANYPAIRED {b1}"}</p>
        </div>
        <h2 className="content-heading2" ref={this.myNAPRef}>
          Not Any Paired
        </h2>
        <p className="content-body">
          Specifying <b>NOTANYPAIRED</b> attempts to force the specified binding
          site to not bind to any other binding site:
        </p>
        <div className="content-div">
          <p className="content-highlight">&emsp;{"NOTANYPAIRED {b1}"}</p>
        </div>
        <hr className="hr-content" />
        <h1 className="content-heading">Advanced Features</h1>
        <h2 className="content-heading2" ref={this.myGenRef}>
          Number of Configurations
        </h2>
        <p className="content-body">
          The <b>number of configurations</b> box will attempt to generate n
          stable configurations with the specified constraints if it is
          possible. If there are less than n stable configurations, then it will
          begin finding configurations with n-1 polymers.
        </p>
        <h2 className="content-heading2" ref={this.myPolyRef}>
          Minimum Polymers
        </h2>
        <p className="content-body">
          If you are certain that there will be at least a certain number of
          polymers, specifying the <b>minimum number of polymers</b> will
          greatly speed up calculations for inputs with a lot of monomers. This
          is because the algorithm works by finding stable configurations with 1
          polymer, 2 polymers, etc. until failure. Specifying minimum polymer
          will make it start searching at the number inputted and increase
          upward until failure. If you would like to learn more about how the
          algorithm works, please see the paper in the about page.
        </p>
        <p className="content-body">
          If the algorithm is unable to find a stable configuration in{" "}
          <strong>90 seconds</strong> the server will <strong>timeout</strong>.
          If this occurs, there are two solutions. First, if you timeout at a
          polymer count = [x], try to run the computation again with minimum
          polymers set to [x] to reduce earlier computation phases.
          Alternatively, you can run the server locally using Docker or directly
          cloning the project from our GitHub repository. You can find a link to
          our GitHub Repository in the About Page.
        </p>
      </Container>
    );
  }

  resizeElementHeight = () => {
    console.log("I GOT CALLED");
    var height = 0;
    var body = window.document.body;
    if (window.innerHeight) {
      height = window.innerHeight;
    } else if (body.parentElement.clientHeight) {
      height = body.parentElement.clientHeight;
    } else if (body && body.clientHeight) {
      height = body.clientHeight;
    }
    var element = document.getElementById("main");
    if (element != null) {
      element.style.height = height - element.offsetTop + "px";
    }
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  componentDidMount() {
    console.log("I MOUNTED!");
    this.resizeElementHeight();
    window.addEventListener("resize", this.resizeElementHeight);
  }

  componentWillUnmount() {
    console.log("I UNMOUNTED!");
    window.removeEventListener("resize", this.resizeElementHeight);
  }
}

export default Content;
