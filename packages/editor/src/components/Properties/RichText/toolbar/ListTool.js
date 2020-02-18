import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { RichUtils } from 'draft-js';
import { Tooltip } from '@expandorg/components';

import { ReactComponent as Icon } from '../assets/list-ol.svg';

import styles from './ListTool.module.styl';

const Btn = Tooltip(({ className, children, ...rest }) => (
  <button className={styles.btn} {...rest}>
    {children}
  </button>
));

export default class ListTool extends Component {
  static propTypes = {
    editorState: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleToggleStyle = evt => {
    const { editorState, onChange } = this.props;
    onChange(RichUtils.toggleBlockType(editorState, 'ordered-list-item'));
    evt.preventDefault();
  };

  render() {
    return (
      <div className={styles.container}>
        <Btn onClick={this.handleToggleStyle} tooltip="Toggle list">
          <Icon width="23px" height="23px" viewBox="0 0 512 512" />
        </Btn>
      </div>
    );
  }
}
