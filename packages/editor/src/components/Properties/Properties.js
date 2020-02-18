import React, { useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { moduleProps } from '@expandorg/modules';
import { Button, IconInput } from '@expandorg/components';

import PropertyEditor from './PropertyEditor/PropertyEditor';
import ErrorContainer from './PropertyEditor/ErrorContainer';

import Validation from './Validation/Validation';
import validateModuleProperties from './validateModuleProperties';

import { EditorContext } from '../EditorContext';

import styles from './Properties.module.styl';

export default function Properties({
  module,
  onChange,
  onSave,
  onCancel,
  variables,
  onToggleVarsDialog,
}) {
  const { controlsMap: controls, modules } = useContext(EditorContext);
  const [errors, setErrors] = useState(null);
  const [moduleName, setModuleName] = useState(module.name);

  const change = useCallback(
    (name, value) => onChange({ ...module, [name]: value }),
    [module, onChange]
  );

  const changeName = useCallback(e => setModuleName(e.target.value), []);

  const changeValidation = useCallback(
    validation => {
      const { validation: prev, ...rest } = module;
      onChange(validation ? { ...rest, validation } : rest);
    },
    [module, onChange]
  );

  const save = useCallback(() => {
    const { module: meta } = controls[module.type];
    const m = { ...module, name: moduleName };
    const e = validateModuleProperties(m, module.name, meta, modules);
    if (e) {
      setErrors(e);
    } else {
      onSave(m);
    }
  }, [controls, module, moduleName, modules, onSave]);

  const {
    module: { name, editor, validation },
  } = controls[module.type];

  return (
    <aside className={styles.container}>
      <div className={styles.content}>
        <div className={styles.props}>
          <div className={styles.title}>{name} properties</div>
          <ErrorContainer errors={errors} field="name">
            <IconInput
              copy
              onChange={changeName}
              placeholder="Component Name"
              tooltip="Component Name"
              value={moduleName}
            />
          </ErrorContainer>
          {!!editor.properties &&
            Reflect.ownKeys(editor.properties).map(propertyName => (
              <ErrorContainer
                key={propertyName}
                errors={errors}
                field={propertyName}
              >
                <PropertyEditor
                  key={propertyName}
                  name={propertyName}
                  variables={variables}
                  onToggleVarsDialog={onToggleVarsDialog}
                  property={editor.properties[propertyName]}
                  moduleProperties={module}
                  onChange={change}
                />
              </ErrorContainer>
            ))}
        </div>
        <div className={styles.validation}>
          <Validation
            rules={validation}
            validation={module.validation}
            onChange={changeValidation}
          />
        </div>
      </div>
      <div className={styles.actions}>
        <Button theme="grey" className={styles.btn} onClick={onCancel}>
          Cancel
        </Button>
        <Button className={cn(styles.done, styles.btn)} onClick={save}>
          Done
        </Button>
      </div>
    </aside>
  );
}

Properties.propTypes = {
  module: moduleProps.isRequired,
  variables: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onToggleVarsDialog: PropTypes.func,
};

Properties.defaultProps = {
  variables: [],
  onToggleVarsDialog: null,
};
