import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { RichUtils } from 'draft-js';
import { Tooltip } from '@expandorg/components';

import styles from './FontStyleTool.module.styl';

const hasStyle = (editorState, name) => {
  const style = editorState.getCurrentInlineStyle();
  return style.has(name);
};

const Btn = Tooltip(({ active, className, children, ...rest }) => (
  <button
    className={cn(styles.btn, className, { [styles.active]: active })}
    {...rest}
  >
    {children}
  </button>
));

export default class FontStyleTool extends Component {
  static propTypes = {
    editorState: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleToggleStyle = evt => {
    const { editorState, onChange } = this.props;
    const { style } = evt.target.dataset;

    onChange(RichUtils.toggleInlineStyle(editorState, style));
    evt.preventDefault();
  };

  render() {
    const { editorState } = this.props;
    return (
      <div className={styles.container}>
        <Btn
          onClick={this.handleToggleStyle}
          className={styles.b}
          data-style="BOLD"
          active={hasStyle(editorState, 'BOLD')}
          tooltip="Bold"
        >
          B
        </Btn>
        <Btn
          onClick={this.handleToggleStyle}
          className={styles.i}
          data-style="ITALIC"
          active={hasStyle(editorState, 'ITALIC')}
          tooltip="Italic"
        >
          I
        </Btn>
        <Btn
          onClick={this.handleToggleStyle}
          className={styles.u}
          data-style="UNDERLINE"
          active={hasStyle(editorState, 'UNDERLINE')}
          tooltip="Underline"
        >
          U
        </Btn>
      </div>
    );
  }
}
