import React, { Component, Fragment } from 'react';
import { MContext } from "../provider";

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class Input extends Component {
    constructor() {
        super()

        this.state = {
            syntaxHighlighting: true,
            hoverColor: "grey.400"
        }

        this.handleTextAreaFocus = this.handleTextAreaFocus.bind(this);
        this.handleTextAreaBlur = this.handleTextAreaBlur.bind(this);
    }

    handleTextAreaFocus() {
        this.setState((_, __) => {
            return { syntaxHighlighting: false };
        });
    }

    handleTextAreaBlur() {
        this.setState((_, __) => {
            return {
                syntaxHighlighting: true,
                hoverColor: "grey.400",
            };
        });
    }

    renderSyntaxHighlight(context) {
        let highlightedMonomers = context.state.inputDataText.trim().split('\n').map((monomer) => {
            return <Chip
                className="Chip-spacing"
                variant="outlined"
                color="secondary"
                label={monomer}
            />
        })
        return (
            <Box
                className='syntaxHighlight'
                border={1}
                textAlign='left'
                color='grey.600'
                borderRadius={5}
                borderColor={this.state.hoverColor}
                onMouseEnter={() => {
                    this.setState({ hoverColor: "black" })
                }}
                onMouseLeave={() => {
                    this.setState({ hoverColor: "grey.400" })
                }}
                onClick={this.handleTextAreaFocus}>
                <Typography> {"TBN Input"}</Typography>
                {highlightedMonomers}
            </Box>
        );
    }

    renderTBNTextField(context) {
        let placeholder = 'a* b*\na b\na*\nb*\n'
        let showTextField = !this.state.syntaxHighlighting || context.state.inputDataText.trim() === ""
        return showTextField ?
            (<TextField
                id="data-input-field"
                className="inputbox"
                label="TBN Input"
                variant="outlined"
                multiline
                fullWidth
                placeholder={placeholder}
                rowsMax={1}
                value={context.state.inputDataText}
                onChange={context.onDataTextChangeHandler}
                onFocus={this.handleTextAreaFocus}
                onBlur={this.handleTextAreaBlur}
                autoFocus={true}
            />) : this.renderSyntaxHighlight(context)
    }

    renderConstraintsTextField(context) {
        return <TextField
            id="contraints-input-field"
            className="inputbox"
            label="Constraints"
            variant="outlined"
            multiline
            rowsMax={1}
            fullWidth
            value={context.state.inputConstraintsText}
            onChange={context.onConstraintsTextChangeHandler}
        />
    }

    renderTBNInputUploadButton(context) {
        return <Button variant="contained" component="label" color="primary" startIcon={<CloudUploadIcon />}>
            Upload TBN Input
            <input
                type="file"
                style={{ display: "none" }}
                onChange={(event) => context.onDataChangeHandler(event)}
            />
        </Button>
    }

    renderTBNConstraintsUploadButton(context) {
        return <Button variant="contained" component="label" color="primary" startIcon={<CloudUploadIcon />}>
            Upload Constraints
            <input
                type="file"
                style={{ display: "none" }}
                onChange={(event) => context.onConstraintsChangeHandler(event)}
            />
        </Button>
    }

    render() {
        return (
            <MContext.Consumer>
                {(context) => (
                    <Fragment>
                        <Grid container direction="column" justify="space-around" alignItems="stretch">
                            {this.renderTBNTextField(context)}
                            {this.renderTBNInputUploadButton(context)}
                            <br />
                            {this.renderConstraintsTextField(context)}
                            {this.renderTBNConstraintsUploadButton(context)}
                        </Grid>
                    </Fragment>
                )}
            </MContext.Consumer>
        );
    }
}

export default Input;