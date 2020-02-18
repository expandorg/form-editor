import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Checkbox, Input, useSyncedState } from '@expandorg/components';

import styles from './Rule.module.styl';

const labels = {
  isMinCharacterCount: 'Minimal characters count',
};

const fnMap = {
  isMinCharacterCount: val => `Minimum ${val} characters`,
};

const getDefaultRuleMessage = (name, val) => {
  const fn = fnMap[name];
  return fn ? fn(val) : 'Invalid';
};

export default function CharactersCount({ onChange, name, value }) {
  const [val, setVal] = useSyncedState(value, v => (v ? `${v[1]}` : '0'));
  const toggle = useCallback(
    v => {
      setVal('0');
      onChange(name, v ? [getDefaultRuleMessage(name, 0), 0] : false);
    },
    [name, onChange, setVal]
  );

  const change = useCallback(
    ({ target }) => {
      setVal(target.value);
      const v = +target.value;
      if (!Number.isNaN(v)) {
        onChange(name, [getDefaultRuleMessage(name, v), v]);
      }
    },
    [name, onChange, setVal]
  );

  const enabled = !!value;
  return (
    <div className={styles.rule}>
      <Checkbox
        className={styles.checkbox}
        value={enabled}
        label={enabled ? null : labels[name] || name}
        onChange={toggle}
      />
      {enabled && (
        <Input
          className={styles.input}
          type="number"
          value={val}
          placeholder={labels[name] || name}
          onChange={change}
        />
      )}
    </div>
  );
}

CharactersCount.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
    PropTypes.array,
  ]),
  onChange: PropTypes.func.isRequired,
};

CharactersCount.defaultProps = {
  value: null,
};
