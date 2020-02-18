import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { useDrop } from 'react-dnd';

import Placeholder from './Placeholder';
import { EditorContext } from '../../EditorContext';
import { nestedTarget } from '../../dnd';

import styles from './EmptyDroppable.module.styl';

export default function EmptyDroppable({ title, path }) {
  const { onMove } = useContext(EditorContext);
  const [, drop] = useDrop(nestedTarget(onMove, path));

  return <Placeholder title={title} ref={drop} className={styles.container} />;
}

EmptyDroppable.propTypes = {
  title: PropTypes.string,
  path: PropTypes.arrayOf(PropTypes.number).isRequired,
};

EmptyDroppable.defaultProps = {
  title: 'Drop here',
};
