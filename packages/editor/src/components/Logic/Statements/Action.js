import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from './components';

import styles from './Action.module.styl';

export default function Action({ name, actions, action, onChange }) {
  return (
    <div className={styles.container}>
      then
      <Dropdown
        className={styles.dd}
        value={action}
        options={actions}
        onChange={onChange}
      />
      <span className={styles.bold}>{name}</span>
    </div>
  );
}

Action.propTypes = {
  name: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.string),
  action: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Action.defaultProps = {
  actions: [],
  action: '',
};
