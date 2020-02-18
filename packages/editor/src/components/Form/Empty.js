import React from 'react';

import { ReactComponent as PreviewIcon } from '@expandorg/uikit/assets/preview.svg';

import styles from './Empty.module.styl';

export default function Empty() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.preview}>
          <PreviewIcon
            className={styles.icon}
            width="144"
            height="110"
            viewBox="0 0 64 48"
          />
        </div>
        <div className={styles.text}>
          Please select an element form the left to begin creating your task.
        </div>
      </div>
    </div>
  );
}
