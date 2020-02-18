import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useClickOutside } from '@expandorg/components';

import styles from './VariablesDropdown.module.styl';

export default function VariablesDropdown({
  variables,
  className,
  onHide,
  onSelect,
  onToggleVarsDialog,
}) {
  const ref = useRef();
  useClickOutside(ref, evt => {
    evt.preventDefault();
    evt.stopPropagation();
    onHide();
  });

  const handleClick = useCallback(
    v => {
      onSelect(v);
      onHide();
    },
    [onHide, onSelect]
  );

  const handleToggle = useCallback(() => {
    onToggleVarsDialog();
    onHide();
  }, [onHide, onToggleVarsDialog]);

  return (
    <div className={cn(styles.dropdown, className)} ref={ref}>
      <div className={styles.list}>
        {variables &&
          variables.map(v => (
            <button
              className={styles.item}
              key={v}
              alt={v}
              onClick={() => handleClick(v)}
            >
              {v}
            </button>
          ))}
      </div>
      {onToggleVarsDialog && (
        <div className={styles.add}>
          <button className={styles.addBtn} onClick={handleToggle}>
            manage variables
          </button>
        </div>
      )}
    </div>
  );
}

VariablesDropdown.propTypes = {
  variables: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  onHide: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onToggleVarsDialog: PropTypes.func,
};

VariablesDropdown.defaultProps = {
  className: null,
  variables: null,
  onToggleVarsDialog: null,
};
