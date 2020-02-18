import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { PropControlTypes } from '@expandorg/modules';

import StringEditor from './StringEditor';
import RichTextEditor from './RichTextEditor';
import SelectEditor from './SelectEditor';
import BoolEditor from './BoolEditor';
import OptionsEditor from './OptionsEditor';
import ModulesEditor from './Children/ModulesEditor';
import ModuleProperyOptionsEditor from './ModuleProperyOptionsEditor';
import ImageRegionEditor from './ImageRegionEditor';
import TimelineRangeEditor from './TimelineRangeEditor';

import styles from './styles.module.styl';

const editors = {
  [PropControlTypes.number]: StringEditor,
  [PropControlTypes.boolean]: BoolEditor,
  [PropControlTypes.string]: StringEditor,
  [PropControlTypes.text]: StringEditor,
  [PropControlTypes.richText]: RichTextEditor,
  [PropControlTypes.enum]: SelectEditor,
  [PropControlTypes.modules]: ModulesEditor,
  [PropControlTypes.options]: OptionsEditor,
  [PropControlTypes.moduleProperyOptions]: ModuleProperyOptionsEditor,
  [PropControlTypes.imageRegion]: ImageRegionEditor,
  [PropControlTypes.timelineRange]: TimelineRangeEditor,
};

export default function PropertyEditor({
  name,
  property: { type, ...params },
  moduleProperties,
  variables,
  onChange,
  onToggleVarsDialog,
}) {
  const change = useCallback(
    v => {
      onChange(name, v);
    },
    [name, onChange]
  );

  const Editor = editors[type];

  if (!Editor) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Editor
        name={name}
        value={moduleProperties[name]}
        onChange={change}
        variables={variables}
        onToggleVarsDialog={onToggleVarsDialog}
        moduleProperties={
          Editor.withModuleProperties ? moduleProperties : undefined
        }
        {...params}
      />
    </div>
  );
}

PropertyEditor.propTypes = {
  name: PropTypes.string.isRequired,
  property: PropTypes.shape({ type: PropTypes.string }).isRequired,
  variables: PropTypes.arrayOf(PropTypes.string),
  moduleProperties: PropTypes.any, // eslint-disable-line
  onChange: PropTypes.func.isRequired,
  onToggleVarsDialog: PropTypes.func,
};

PropertyEditor.defaultProps = {
  variables: [],
  moduleProperties: undefined,
  onToggleVarsDialog: null,
};
