import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { clickOutside } from '@expandorg/components';

import { ReactComponent as IconLeft } from '../../assets/align-left.svg';
import { ReactComponent as IconCenter } from '../../assets/align-center.svg';
import { ReactComponent as IconRight } from '../../assets/align-right.svg';

import styles from './AlignmentTool.module.styl';

const Btn = ({ active, onClick, value, children, ...rest }) => (
  <button
    onClick={evt => onClick(evt, value)}
    className={cn(styles.btn, styles.item, {
      [styles.active]: active === value,
    })}
    {...rest}
  >
    {children}
  </button>
);

Btn.propTypes = {
  value: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

class AlignmentDropdown extends Component {
  static propTypes = {
    active: PropTypes.string.isRequired,
    forwardedRef: PropTypes.object.isRequired, // eslint-disable-line
    onClick: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  handleClickOutside = () => {
    const { onHide } = this.props;
    onHide();
  };

  handleClick = (evt, value) => {
    const { onClick, onHide } = this.props;
    onClick(evt, value);
    onHide();
  };

  render() {
    const { active, forwardedRef } = this.props;

    return (
      <div ref={forwardedRef} className={styles.dropdown}>
        <Btn value="left" onClick={this.handleClick} active={active}>
          <IconLeft />
        </Btn>
        <Btn value="center" onClick={this.handleClick} active={active}>
          <IconCenter />
        </Btn>
        <Btn value="right" onClick={this.handleClick} active={active}>
          <IconRight />
        </Btn>
      </div>
    );
  }
}

export default clickOutside(AlignmentDropdown);
