import React from 'react';
import PropTypes from 'prop-types';

import { useDrop } from 'react-dnd';

import { moduleProps } from '@expandorg/modules';

import { EmptyDroppable } from './Placeholders';

// eslint-disable-next-line import/no-cycle
import FormModule from './FormModule';

import { nestedModuleTarget } from '../dnd';

import styles from './Nested.module.styl';

export default function Nested({ title, modules, selection, path }) {
  const [, drop] = useDrop(nestedModuleTarget);
  const hasNested = modules && modules.length > 0;

  return (
    <div className={styles.nested} ref={drop}>
      {hasNested ? (
        modules.map((nestedModule, nestedOrder) => (
          <FormModule
            key={nestedModule.name}
            path={[...path, nestedOrder]}
            module={nestedModule}
            selection={selection}
          />
        ))
      ) : (
        <EmptyDroppable title={title || 'Drop here'} path={path} />
      )}
    </div>
  );
}

Nested.propTypes = {
  title: PropTypes.string,
  modules: PropTypes.arrayOf(moduleProps),
  path: PropTypes.arrayOf(PropTypes.number).isRequired,
  selection: PropTypes.string,
};

Nested.defaultProps = {
  title: null,
  modules: null,
  selection: null,
};
