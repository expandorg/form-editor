/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useDrag, useDrop } from 'react-dnd';

import { moduleProps } from '@expandorg/modules';

import miniIcon from '../../../shared/icons/miniIcon';

import { source, target } from './dnd';

import styles from './ChildModule.module.styl';

export default function ChildModule({
  module,
  index,
  onDrag,
  onEndDrag,
  onSelect,
}) {
  const ref = useRef(null);

  const select = useCallback(() => {
    onSelect(index, module);
  }, [index, module, onSelect]);

  const [, drag] = useDrag(source(index, onEndDrag));
  const [, drop] = useDrop(target(ref, index, onDrag));

  return (
    <div className={cn(styles.child)} ref={drag(drop(ref))} onClick={select}>
      <div className={cn(styles.miniIcon, miniIcon(module.type))} />
      <div className={styles.name}>{module.name}</div>
    </div>
  );
}

ChildModule.propTypes = {
  index: PropTypes.number.isRequired,
  module: moduleProps.isRequired,
  onDrag: PropTypes.func.isRequired,
  onEndDrag: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};
