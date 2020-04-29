import React, { Component, Fragment } from 'react';
import { MContext } from '../provider';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteForever from '@material-ui/icons/DeleteForever';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import LinkIcon from '@material-ui/icons/Link';
import { withStyles } from '@material-ui/core/styles';

import Monomer from './monomer';
import '../../App.css';

const HtmlTooltip = withStyles({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 'none',
    fontSize: 16,
    border: '1px solid #dadde9',
  },
})(Tooltip);

const UploadButton = withStyles({
  root: {
    backgroundColor: '#3F88C5',
  },
})(Button);

const ClearButton = withStyles({
  root: {
    // backgroundColor: '#EAD6C9', // Uncomment to modify Clear Button color
  },
})(Button);

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

class Input extends Component {
  constructor() {
    super();

    this.state = {
      copiedFlag: false,
      syntaxHighlighting: true,
      hoverColor: 'grey.400',
    };

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
        hoverColor: 'grey.400',
      };
    });
  }

  renderSyntaxHighlight(context) {
    let highlightedMonomers = context.state.inputDataText
      .trim()
      .split('\n')
      .map((line) => {
        line = line.trim();
        this.removeComment(line);
        if (this.isComment(line)) {
          return <p>{line}</p>;
        } else {
          line = this.removeComment(line).trim();
          if (line) {
            return (
              <Monomer
                bindingSites={Monomer.extractBindingSites(line)}
                monomerName={Monomer.extractMonomerName(line)}
                color={'primary'}
              />
            );
          }
        }
      });
    return (
      <Box
        className='syntaxHighlight'
        border={1}
        textAlign='left'
        color='grey.600'
        borderRadius={5}
        borderColor={this.state.hoverColor}
        onMouseEnter={() => {
          this.setState({ hoverColor: 'black' });
        }}
        onMouseLeave={() => {
          this.setState({ hoverColor: 'grey.400' });
        }}
        onClick={this.handleTextAreaFocus}
      >
        {/* <Typography> {'TBN Input'}</Typography> */}
        {highlightedMonomers}
      </Box>
    );
  }

  renderTBNTextField(context) {
    let showTextField =
      !this.state.syntaxHighlighting ||
      context.state.inputDataText.trim() === '';
    return showTextField ? (
      <TextField
        id='data-input-field'
        className='tbn-inputbox'
        label='TBN Input'
        variant='outlined'
        multiline
        fullWidth
        rowsMax={1}
        value={context.state.inputDataText}
        onChange={context.onDataTextChangeHandler}
        onFocus={this.handleTextAreaFocus}
        onBlur={this.handleTextAreaBlur}
        autoFocus={true}
      />
    ) : (
        this.renderSyntaxHighlight(context)
      );
  }

  renderConstraintsTextField(context) {
    return (
      <TextField
        id='contraints-input-field'
        className='constraints-inputbox'
        label='Optional Constraints'
        variant='outlined'
        multiline
        rowsMax={1}
        fullWidth
        value={context.state.inputConstraintsText}
        onChange={context.onConstraintsTextChangeHandler}
      />
    );
  }

  renderTBNInputUploadButton(context) {
    return (
      <div>
        <span className='help-button'>
          <HtmlTooltip
            title={
              <Fragment>
                Input Format:
                <ul>
                  <li> Each line in the input represents a monomer</li>
                  <li>
                    {' '}
                    Each space-delineated token represents a binding site
                  </li>
                </ul>
                If you want to use constraints (optional):
                <ul>
                  <li>To label a monomer, use a greater than sign (>)</li>
                  <li>To label a binding site, use a colon (:)</li>
                </ul>
                For more information on input format, please visit{' '}
                <Link to='help#input-format'>Help</Link> page.
              </Fragment>
            }
            arrow
            placement='top'
            interactive
          >
            <IconButton aria-label='delete'>
              <HelpIcon />
            </IconButton>
          </HtmlTooltip>
          <UploadButton
            variant='contained'
            component='label'
            color='primary'
            startIcon={<CloudUploadIcon />}
          >
            Upload TBN Input
            <input
              type='file'
              style={{ display: 'none' }}
              onChange={(event) => context.onDataChangeHandler(event)}
            />
          </UploadButton>
        </span>
        <span className='clear-button'>
          <ClearButton
            variant='contained'
            component='label'
            color='disabled'
            startIcon={<DeleteForever />}
            onClick={() => context.onClearDataHandler()}
          >
            Clear
          </ClearButton>
        </span>
      </div>
    );
  }

  renderTBNConstraintsUploadButton(context) {
    return (
      <div>
        <span className='help-button'>
          <HtmlTooltip
            title={
              <Fragment>
                Possible Constraints:
                <ul>
                  <li>{'TOGETHER {m1} {m2} {m3} ...'}</li>
                  <li>{'NOTTOGETHER {m1} {m2}'}</li>
                  <li>{'FREE {m1}'}</li>
                  <li>{'NOTFREE {m1}'}</li>
                  <li>{'PAIRED {b1} {b2}'}</li>
                  <li>{'NOTPAIRED {b1} {b2}'}</li>
                  <li>{'ANYPAIRED {b1}'}</li>
                  <li>{'NOTANYPAIRED {b1}'}</li>
                </ul>
                For more information on constraints, please visit{' '}
                <Link to='/help#constraints-format'>Help</Link> page.
              </Fragment>
            }
            arrow
            placement='top'
            interactive
          >
            <IconButton aria-label='delete'>
              <HelpIcon />
            </IconButton>
          </HtmlTooltip>
          <UploadButton
            variant='contained'
            component='label'
            color='primary'
            startIcon={<CloudUploadIcon />}
          >
            Upload Constraints
            <input
              type='file'
              style={{ display: 'none' }}
              onChange={(event) => context.onConstraintsChangeHandler(event)}
            />
          </UploadButton>
        </span>
        <span className='clear-button'>
          <ClearButton
            variant='contained'
            component='label'
            color='disabled'
            startIcon={<DeleteForever />}
            onClick={() => context.onClearConstraintsHandler()}
          >
            Clear
          </ClearButton>
        </span>
      </div>
    );
  }

  renderExampleDropdown(context) {
    return (
      <FormControl>
        <NativeSelect
          id='select'
          name='example'
          className='example-dropdown'
          onChange={(event) => { context.onExampleChangeHandler(event); document.getElementById('select').selectedIndex = 0; }}
        >
          <option value='' disabled selected>
            Example Inputs
          </option>
          <option value={'and_gate_2_input'}>2 Input And Gate</option>
          <option value={'and_gate_3_input'}>3 Input And Gate</option>
          <option value={'or_gate'}>Or Gate</option>
          <option value={'sum_of_products'}>Sum Of Products</option>
        </NativeSelect>
        {/* <FormHelperText>Select an Example Input to try it out!</FormHelperText> */}
      </FormControl>
    );
  }

  renderShareURL(context) {
    let input = context.state.inputDataText;
    let constraints = context.state.inputConstraintsText;

    return <Grid item >
      <Tooltip
        title={<Typography variant='body1' gutterBottom>Copy Share URL</Typography>}
        placement='top'
        arrow
        interactive
      >
        <IconButton color='secondary' onClick={(e) => {
          let host = 'http://' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
          this.onClickCopy(
            host +
            '?input=' +
            this.toCharCode(input) +
            '&constraints=' +
            this.toCharCode(constraints)
          )
          this.setState({
            copiedFlag: true,
          });
        }}>
          <LinkIcon />
        </IconButton>
      </Tooltip>
      <Snackbar
        open={this.state.copiedFlag}
        autoHideDuration={2000}
        onClose={() => this.setState({ copiedFlag: false })}>
        <Alert
          onClose={() => this.setState({ copiedFlag: false })}
          severity='success'>
          Copied URL to clipboard
        </Alert>
      </Snackbar>
    </Grid >
  }

  onClickCopy = (value) => {
    var input = document.createElement('textarea');
    input.innerHTML = value;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }

  toCharCode(str) {
    let encode = ''
    for (let i = 0; i < str.length; i++) {
      encode += '%' + ('0' + (str.charCodeAt(i)).toString(16)).slice(-2).toUpperCase()
    }
    return encode
  }

  isComment(line) {
    return line.charAt(0) === '#';
  }

  removeComment(line) {
    let regex = /(#.*)/;
    return line.replace(regex, '').trim();
  }

  render() {
    return (
      <MContext.Consumer>
        {(context) => (
          <Fragment>
            <Grid
              container
              direction='column'
            >
              <Grid container direction='row'
                alignItems='left'>
                {this.renderShareURL(context)}
                {this.renderExampleDropdown(context)}
              </Grid>
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
