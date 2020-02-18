import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import Rule from './Rule';
import CharactersCount from './CharactersCount';

import styles from './Validation.module.styl';

const componentsMap = {
  isMinCharacterCount: CharactersCount,
};

export default function Validation({ rules, validation, onChange }) {
  const change = useCallback(
    (name, value) => {
      const { [name]: _, ...rest } = validation || {};
      if (value) {
        onChange({ ...rest, [name]: value });
      } else {
        onChange(Reflect.ownKeys(rest).length ? rest : null);
      }
    },
    [onChange, validation]
  );

  if (!rules) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>Validation Settings</div>
      <div className={styles.rules}>
        {Reflect.ownKeys(rules).map(rule => {
          const Settings = componentsMap[rule] || Rule;
          return (
            <Settings
              key={rule}
              name={rule}
              value={validation ? validation[rule] : undefined}
              onChange={change}
            />
          );
        })}
      </div>
    </div>
  );
}

Validation.propTypes = {
  validation: PropTypes.object, // eslint-disable-line
  rules: PropTypes.object, // eslint-disable-line
  onChange: PropTypes.func.isRequired,
};

Validation.defaultProps = {
  validation: null,
  rules: null,
};
