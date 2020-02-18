/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { moduleProps, Module } from '@expandorg/modules';

// eslint-disable-next-line import/no-cycle
import Nested from './Nested';
import Header from './Preview/Header';
import NotSupported from './Preview/NotSupported';
import useModuleWrapper from './Preview/useModuleWrapper';
import { treeEditor } from '../Tree';

import { supportNesting } from '../../common/modules';

import styles from './Preview.module.styl';
import { EditorContext } from '../EditorContext';

const getModulesHeader = meta => meta.editor.properties.modules.caption;

const skipPreview = meta => !!meta.editor.skipPreview;

export default function Preview({ preview, module, selection, path }) {
  const {
    onCopy,
    onRemove,
    onSelect,
    controlsMap,
    collapsedMap,
    getModuleActions,
    onToggleCollapse,
  } = useContext(EditorContext);

  const copy = useCallback(() => onCopy(path, module), [module, onCopy, path]);
  const remove = useCallback(() => onRemove(path), [onRemove, path]);

  const select = useCallback(() => onSelect(path, module, 'edit'), [
    module,
    onSelect,
    path,
  ]);

  const toggleCollapse = useCallback(() => onToggleCollapse(module.name), [
    module.name,
    onToggleCollapse,
  ]);

  const ControlType = controlsMap[module.type];
  const isSelected = treeEditor.getIdByPath(path) === selection;

  const { values, editing, onChange, dimmed, module: m } = useModuleWrapper(
    module,
    isSelected
  );

  if (!ControlType) {
    return <NotSupported type={module.type} onRemove={remove} />;
  }

  const classes = cn(styles.inner, {
    [styles.dimmed]: dimmed,
    [styles.hidden]: skipPreview(ControlType.module),
  });

  const nesting = supportNesting(ControlType.module);
  const collapsed = collapsedMap[module.name];

  return preview(
    <div className={cn(styles.container, { [styles.selected]: isSelected })}>
      <Header
        module={module}
        collapsed={collapsed}
        nesting={nesting}
        onSelect={select}
        actions={getModuleActions(module)}
        onRemove={remove}
        onCopy={copy}
        onToggleCollapse={toggleCollapse}
      />
      {!collapsed && (
        <>
          <div className={classes}>
            <Module
              module={m}
              controls={controlsMap}
              values={values}
              onChange={onChange}
            />
            {!editing && <div className={styles.edit} onClick={select} />}
          </div>
          {nesting && (
            <Nested
              title={getModulesHeader(ControlType.module)}
              selection={selection}
              modules={m.modules}
              path={path}
            />
          )}
        </>
      )}
    </div>
  );
}

Preview.propTypes = {
  module: moduleProps.isRequired,
  path: PropTypes.arrayOf(PropTypes.number).isRequired,
  selection: PropTypes.string,
  preview: PropTypes.func.isRequired,
};

Preview.defaultProps = {
  selection: null,
};
