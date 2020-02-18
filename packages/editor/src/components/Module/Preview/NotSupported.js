import React from 'react';
import PropTypes from 'prop-types';

import { Tooltip } from '@expandorg/components';
import { ReactComponent as Icon } from '@expandorg/uikit/assets/warning.svg';
import { ReactComponent as Del } from '../../../assets/delete.svg';

import styles from './NotSupported.module.styl';

const Warning = Tooltip(({ children, ...rest }) => (
  <span className={styles.tooltip} {...rest}>
    <Icon width={24} height={24} viewBox="0 0 42 42" />
    {children}
  </span>
));

export default function NotSupported({ type, onRemove }) {
  return (
    <div className={styles.container}>
      <Warning
        tooltipOrientation="right"
        tooltip="This component has been deprecated. Please update."
      />
      <span className={styles.name}>{type} module</span>
      <button onClick={onRemove} className={styles.remove}>
        <Del />
      </button>
    </div>
  );
}

NotSupported.propTypes = {
  type: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};
