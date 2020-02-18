import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import styles from './SuggestionsEntry.module.styl';

const SuggestionsEntry = ({
  className,
  mention,
  isFocused,
  searchValue,
  theme,
  ...rest
}) => (
  <div
    {...rest}
    className={cn(styles.container, { [styles.focused]: isFocused })}
  >
    <span className={styles.text}>{mention.suggestion}</span>
  </div>
);

SuggestionsEntry.propTypes = {
  className: PropTypes.string,
  mention: PropTypes.shape({
    name: PropTypes.string,
    suggestion: PropTypes.string,
  }).isRequired,
  theme: PropTypes.any, // eslint-disable-line
  searchValue: PropTypes.string,
  isFocused: PropTypes.bool,
};

SuggestionsEntry.defaultProps = {
  className: null,
  theme: null,
  isFocused: false,
  searchValue: undefined,
};

export default SuggestionsEntry;
