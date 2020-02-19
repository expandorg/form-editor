import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { deferVisibleRender } from '@expandorg/components';

import styles from './TopPlaceholder.module.styl';

function TopPlaceholder({ visible, placeholder, className }) {
  const classes = cn(
    styles.container,
    { [styles.visible]: visible },
    className
  );
  return <div className={classes}>{placeholder}</div>;
}

TopPlaceholder.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  visible: PropTypes.bool,
};

TopPlaceholder.defaultProps = {
  placeholder: undefined,
  className: undefined,
  visible: false,
};

export default deferVisibleRender(TopPlaceholder);
