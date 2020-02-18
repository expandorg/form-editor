import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '@expandorg/components';
import I from '../../shared/I';

import styles from './styles.module.styl';

export default function BoolEditor({ value, label, onChange, name }) {
  return (
    <div className={styles.cbContainer}>
      <Checkbox
        className={styles.checkbox}
        value={value}
        label={label}
        onChange={onChange}
      />
      {name === 'readOnly' && (
        <I
          className={styles.readonlyTooltip}
          tooltipPosition="right"
          tooltip="readOnly Property"
        />
      )}
    </div>
  );
}

BoolEditor.propTypes = {
  name: PropTypes.PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

BoolEditor.defaultProps = {
  value: undefined,
  label: undefined,
};
