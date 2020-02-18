import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '@expandorg/components';
import { getDefaultRuleMessage } from '@expandorg/modules/model';

import styles from './Rule.module.styl';

const labels = {
  isRequired: 'This field is required (*) to proceed',
  isEmail: 'Should be valid email address',
  isUrl: 'Should be valid URL',
  isTrue: 'Should be checked',
  isNumber: 'Should be a number',
  isRequiredArray: 'Should have at least one value',
};

export default function Rule({ onChange, name, value }) {
  const toggle = useCallback(
    v => {
      onChange(name, v ? getDefaultRuleMessage(name) : false);
    },
    [name, onChange]
  );

  return (
    <div className={styles.rule}>
      <Checkbox
        className={styles.checkbox}
        value={!!value}
        label={labels[name] || name}
        onChange={toggle}
      />
      {/* {enabled && (
          <Input
            className={styles.input}
            value={val}
            placeholder={label}
            onChange={this.handleInput}
          />
        )} */}
    </div>
  );
}

Rule.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.func.isRequired,
};

Rule.defaultProps = {
  value: null,
};
