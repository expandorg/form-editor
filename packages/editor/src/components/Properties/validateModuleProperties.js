// @flow
import { rules, validateForm } from '@expandorg/validation';
import { getFormModulesNames } from '@expandorg/modules/model';
import type {
  Module,
  ModuleControlMeta,
} from '@expandorg/modules/src/form/model/types.flow';

const nameIsUniq = (modules: Array<Module>, originalName: string) => (
  name: string
) => {
  if (name === originalName) {
    return true;
  }
  const names = new Set(getFormModulesNames({ modules }));
  return !names.has(name);
};

const getModulePropsRules = (
  meta: ModuleControlMeta,
  originalName: string,
  modules: Array<Module>
) => {
  const nameRules = [[prop => !!prop, 'Name is required']];

  if (originalName && modules) {
    nameRules.push([
      nameIsUniq(modules, originalName),
      'Name should be uniq in form',
    ]);
  }
  const props = (meta.editor && meta.editor.properties) || {};
  return Reflect.ownKeys(props).reduce(
    (r, propertyName) => {
      const property = props[propertyName];
      if (property.required) {
        return {
          ...r,
          [propertyName]: [[rules.isRequired, `${propertyName} is required`]],
        };
      }
      return r;
    },
    { name: nameRules }
  );
};

export default function validateModuleProperties(
  module: Module,
  originalName: string,
  meta: ModuleControlMeta,
  modules: Array<Module>
) {
  const propRules = getModulePropsRules(meta, originalName, modules);
  return validateForm(module, propRules);
}
