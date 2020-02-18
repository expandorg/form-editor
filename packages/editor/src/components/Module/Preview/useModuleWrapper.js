import { useContext } from 'react';

import { ValueContext } from '../../ValueContext';
import { EditorContext } from '../../EditorContext';

const overrideReadonly = module => {
  if (module.readOnly) {
    const { readOnly, ...rest } = module;
    return rest;
  }
  return module;
};

export default function useModuleWrapper(original, isSelected) {
  const { selectedModule } = useContext(EditorContext);
  const { isValueEditable, moduleValues, onChangeValue } = useContext(
    ValueContext
  );

  const module = isSelected ? selectedModule : original;
  const editing = isSelected && isValueEditable;

  return {
    editing,
    module: editing ? overrideReadonly(module) : module,
    values: editing ? moduleValues : undefined,
    onChange: editing ? onChangeValue : undefined,
  };
}
