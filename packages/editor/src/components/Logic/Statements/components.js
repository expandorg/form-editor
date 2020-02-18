import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { DropdownBase, AutocompleteInput } from '@expandorg/components';

import styles from './components.module.styl';

export const Dropdown = ({ className, ...props }) => (
  <DropdownBase className={cn(styles.dropdown, className)} {...props}>
    {({ formatted, value }) => formatted || value}
  </DropdownBase>
);

Dropdown.propTypes = {
  className: PropTypes.string,
};

Dropdown.defaultProps = {
  className: null,
};

export const Input = ({ className, ...props }) => (
  <AutocompleteInput className={cn(styles.input, className)} {...props} />
);

Input.propTypes = {
  className: PropTypes.string,
};

Input.defaultProps = {
  className: null,
};
