import React from 'react';
import cn from 'classnames';

import { moduleProps } from '@expandorg/modules';

import LogicEditor from './LogicEditor';

import styles from './LogicPanel.module.styl';

export default function LogicPanel({ module, ...rest }) {
  const visible = !!module;
  return (
    <div className={cn(styles.container, { [styles.visible]: visible })}>
      {visible && (
        <div className={styles.panel}>
          <LogicEditor key={module.name} module={module} {...rest} />
        </div>
      )}
    </div>
  );
}

LogicPanel.propTypes = {
  module: moduleProps,
};

LogicPanel.defaultProps = {
  module: null,
};
