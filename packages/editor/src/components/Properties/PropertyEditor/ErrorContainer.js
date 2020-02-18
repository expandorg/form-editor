import React from 'react';

import { ErrorMessage } from '@expandorg/components';

import styles from './styles.module.styl';

export default function ErrorContainer({ children, ...rest }) {
  return (
    <div className={styles.field}>
      {children}
      <ErrorMessage {...rest} className={styles.error} />
    </div>
  );
}
