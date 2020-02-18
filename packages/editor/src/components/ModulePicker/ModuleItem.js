/* eslint-disable jsx-a11y/click-events-have-key-events  */
/* eslint-disable jsx-a11y/no-static-element-interactions  */

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useDrag } from 'react-dnd';

import { metaSource } from '../dnd';
import miniIcon from '../shared/icons/miniIcon';

import styles from './ModuleItem.module.styl';

export default function ModuleItem({ meta, onAdd, onEndDrag }) {
  const add = useCallback(() => onAdd(meta), [meta, onAdd]);
  const [{ isDragging }, drag] = useDrag(metaSource(meta, onEndDrag));
  const classes = cn(styles.container, {
    [styles.dragging]: isDragging,
  });
  return (
    <div className={classes} onClick={add} ref={drag}>
      <div className={cn(styles.miniIcon, miniIcon(meta.type))} />
      <div className={styles.name}>{meta.name}</div>
    </div>
  );
}

ModuleItem.propTypes = {
  meta: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  onEndDrag: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};
