import React from 'react';
import PropTypes from 'prop-types'
import Chip from "@material-ui/core/Chip";


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
            return line.replace(/.* >/, '')
        } else {
            return null
        }
    }

    renderMonomer() {
        return <Chip
            className="Chip-spacing"
            variant="outlined"
            color={this.props.color}
            label={this.props.bindingSites}
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
                {this.props.bindingSites}
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