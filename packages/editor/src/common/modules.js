// @flow
import generate from 'nanoid/generate';
import { getFormModulesNames } from '@expandorg/modules/model';
import type {
  ModuleControlMeta,
  Module,
} from '@expandorg/modules/src/form/model/types.flow';

export const supportNesting = ({ editor }: ModuleControlMeta): boolean =>
  !!(editor && editor.properties && editor.properties.modules);

export const newModuleId = (type: string, names: Set<string>) => {
  let i = 0;
  while (i < 1000) {
    const name = `${type}${i}`;
    if (!names.has(name)) {
      return name;
    }
    i += 1;
  }
  return `${type}-${generate('1234567890abcdef', 3)}`;
};

export const deepCopyModule = (module: Module, names: Set<string>) => {
  const { modules: children, type, ...rest } = module;
  let modules;
  if (children) {
    modules = children.map<Module>(child => deepCopyModule(child, names));
  }
  const name = newModuleId(type, names);
  names.add(name);
  return { ...rest, type, name, modules };
};

export const createModule = (
  meta: ModuleControlMeta,
  modules: Array<Module>,
  isDragging: boolean = false
): Module => ({
  ...(meta.editor && meta.editor.defaults),
  type: meta.type,
  name: newModuleId(meta.type, new Set(getFormModulesNames({ modules }))),
  isDragging,
  modules: supportNesting(meta) ? [] : undefined,
});
