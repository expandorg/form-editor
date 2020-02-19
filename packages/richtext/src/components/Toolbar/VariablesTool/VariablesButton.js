import React from 'react';
import PropTypes from 'prop-types';

import VariablesToggle from '../../Variables/VariablesToggle';

import styles from './VariablesButton.module.styl';

export default function VariablesButton({
  variables,
  onSelect,
  onToggleVarsDialog,
}) {
  return (
    <div className={styles.container}>
      <VariablesToggle
        variables={variables}
        onSelect={onSelect}
        onToggleVarsDialog={onToggleVarsDialog}
      >
        {({ onToggle }) => (
          <button className={styles.button} onClick={onToggle}>
            +var
          </button>
        )}
      </VariablesToggle>
    </div>
  );
}

VariablesButton.propTypes = {
  variables: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func.isRequired,
  onToggleVarsDialog: PropTypes.func,
};

VariablesButton.defaultProps = {
  variables: [],
  onToggleVarsDialog: null,
};
