import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Drawer } from '@expandorg/components';

import Properties from './Properties';

import styles from './PropertiesPanel.module.styl';
import { EditorContext } from '../EditorContext';

export default function PropertiesPanel({ width, ...rest }) {
  const { onEdit, onDeselect, selectedModule, onEditSelected } = useContext(
    EditorContext
  );
  const visible = !!selectedModule;
  return (
    <Drawer className={styles.container} width={width} visible={visible}>
      {visible && (
        <Properties
          key={selectedModule.name}
          module={selectedModule}
          onChange={onEditSelected}
          onSave={onEdit}
          onCancel={onDeselect}
          {...rest}
        />
      )}
    </Drawer>
  );
}

PropertiesPanel.propTypes = {
  width: PropTypes.number,
};

PropertiesPanel.defaultProps = {
  width: 540,
};
