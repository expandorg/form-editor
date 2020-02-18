import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { DraftTextInput } from '../RichText';
import { restoreVariables } from './restoreVariables';

import styles from './styles.module.styl';

export default function StringEditor({
  value,
  placeholder,
  variables,
  onChange,
  onToggleVarsDialog,
}) {
  const handleChange = useCallback(
    v => {
      onChange(v);
    },
    [onChange]
  );

  return (
    <DraftTextInput
      className={styles.input}
      autocomplete={variables}
      value={value}
      restoreEntities={restoreVariables}
      placeholder={placeholder}
      onChange={handleChange}
      onToggleVarsDialog={onToggleVarsDialog}
    />
  );
}

StringEditor.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  variables: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onToggleVarsDialog: PropTypes.func,
};

StringEditor.defaultProps = {
  value: undefined,
  variables: [],
  placeholder: undefined,
  onToggleVarsDialog: null,
};
