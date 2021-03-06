import React from 'react';
import PropTypes from 'prop-types'
import Chip from "@material-ui/core/Chip";
import Parser from 'html-react-parser';


class Monomer extends React.Component {
    propTypes = {
        bindingSites: PropTypes.string,
        monomerName: PropTypes.string,
        color: PropTypes.string // "Primary/Secondary"
    }

    static extractBindingSites(line) {
        return line.replace(/ >.*/, '')
    }

    static extractMonomerName(line) {
        if (line.includes(' >')) {
            let index = line.indexOf('>')
            return line.substring(index + 1).replace(/ .*/, '')
        } else {
            return null
        }
    }

    //replace site:site-name -> site<strong>:sitename</strong>
    highlightBindingSiteName(line) {
        // .replace(/(\w+\*)/g, '<em>$&</em>') // Complement Highlighting?
        var stringFormat = line.replace(/(:\w+)/g, '<strong>$&</strong>');
        return <span>{Parser(stringFormat)}</span> 
    }

    renderMonomer() {
        return <Chip
            className="Chip-spacing"
            variant="outlined"
            color={this.props.color}
            label={this.highlightBindingSiteName(this.props.bindingSites)}
        />
    }

    renderMonomerWithName() {
        let label = <span>
            <p>
                <Chip
                    className="Chip-spacing monomer-name"
                    size="small"
                    label={<strong>{this.props.monomerName}</strong>}
                    color={this.props.color}
                    variant="default"
                />
                {this.highlightBindingSiteName(this.props.bindingSites)}
            </p>
        </span>
        return <Chip
            className="Chip-spacing"
            variant="outlined"
            color={this.props.color}
            label={label}
        />
    }

    render() {
        if (this.props.monomerName) {
            return this.renderMonomerWithName();
        } else {
            return this.renderMonomer()
        }
    }
}

export default Monomer;