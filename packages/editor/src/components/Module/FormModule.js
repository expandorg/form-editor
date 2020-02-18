import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';

import { useDrag, useDrop } from 'react-dnd';
import { moduleProps } from '@expandorg/modules';

import { Placeholder } from './Placeholders';

// eslint-disable-next-line import/no-cycle
import Preview from './Preview';
import { EditorContext } from '../EditorContext';

import { moduleSource, moduleTarget } from '../dnd';

import styles from './FormModule.module.styl';

export default function FormModule({ module, selection, path }) {
  const { controlsMap, onMove, onEndDrag } = useContext(EditorContext);

  const ref = useRef(null);
  const [{ isDragging }, drag, preview] = useDrag(
    moduleSource(module.name, path, onEndDrag, selection)
  );
  const meta = controlsMap[module.type].module;
  const [, drop] = useDrop(moduleTarget(ref, path, meta, onMove));

  return (
    <div className={styles.container} ref={drag(drop(ref))}>
      {!isDragging && !module.isDragging ? (
        <Preview
          path={path}
          selection={selection}
          module={module}
          preview={preview}
        />
      ) : (
        <Placeholder />
      )}
    </div>
  );
}

FormModule.propTypes = {
  module: moduleProps.isRequired,
  path: PropTypes.arrayOf(PropTypes.number).isRequired,
  selection: PropTypes.string,
};

FormModule.defaultProps = {
  selection: null,
};
