import React from 'react';

import styles from './If.module.styl';

export default function If({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.if}>If</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
