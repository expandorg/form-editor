import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Tooltip } from '@expandorg/components';

import { ReactComponent as IconLeft } from '../../assets/align-left.svg';
import { ReactComponent as IconCenter } from '../../assets/align-center.svg';
import { ReactComponent as IconRight } from '../../assets/align-right.svg';

import { applyAlignment, getActiveAlignment } from '../../content';

import AlignmentDropdown from './AlignmentDropdown';

import styles from './AlignmentTool.module.styl';

const Btn = Tooltip(({ active, onClick, value, children, ...rest }) => (
  <button
    onClick={evt => onClick(evt, value)}
    className={cn(styles.btn, styles.active)}
    {...rest}
  >
    {children}
  </button>
));

const alignments = {
  left: IconLeft,
  center: IconCenter,
  right: IconRight,
};

export default class AlignmentTool extends Component {
  static propTypes = {
    editorState: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  state = { opened: false };

  handleChange = (evt, value) => {
    const { editorState, onChange } = this.props;

    onChange(applyAlignment(editorState, value));
  };

  handleOpen = () => {
    this.setState({
      opened: true,
    });
  };

  handleHide = () => {
    this.setState({
      opened: false,
    });
  };

  render() {
    const { editorState } = this.props;
    const active = getActiveAlignment(editorState);
    const Icon = alignments[active];
    const { opened } = this.state;

    return (
      <div className={styles.container}>
        <Btn value={active} onClick={this.handleOpen} tooltip="Alignment">
          <Icon />
        </Btn>
        {opened && (
          <AlignmentDropdown
            active={active}
            onClick={this.handleChange}
            onHide={this.handleHide}
          />
        )}
      </div>
    );
  }
}
