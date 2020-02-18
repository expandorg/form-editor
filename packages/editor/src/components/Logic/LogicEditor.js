import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import { getFormModulesNames } from '@expandorg/modules/model';

import { Button } from '@expandorg/components';
import { moduleProps } from '@expandorg/modules';

import VisibilityLogic from './VisibilityLogic';

import { ModuleLogic as ML } from './logic';

import styles from './LogicEditor.module.styl';

const getUniqNames = modules => [...new Set(getFormModulesNames({ modules }))];

export default function LogicEditor({
  module: original,
  modules,
  variables,
  onSave,
  onCancel,
}) {
  const [module, setModule] = useState(original);
  const values = useMemo(() => getUniqNames(modules), [modules]);

  return (
    <div className={styles.container}>
      <VisibilityLogic
        module={module}
        variables={variables}
        values={values}
        onChange={setModule}
      />
      <div className={styles.actions}>
        <Button
          className={styles.btn}
          theme="link"
          onClick={() => setModule(ML.clear(module))}
          size="small"
        >
          Clear
        </Button>
        <Button
          theme="grey"
          className={styles.btn}
          size="small"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          className={styles.btn}
          onClick={() => onSave(ML.cleanup(module))}
          size="small"
        >
          Save
        </Button>
      </div>
    </div>
  );
}

LogicEditor.propTypes = {
  module: moduleProps.isRequired,
  modules: PropTypes.arrayOf(moduleProps),
  variables: PropTypes.arrayOf(PropTypes.string),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

LogicEditor.defaultProps = {
  modules: [],
  variables: [],
};
