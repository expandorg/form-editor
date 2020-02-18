// @flow

export type TreeModule = {
  modules?: Array<TreeModule>,
};

export default class ModulesTreeEditor {
  findByPath = (
    modules: Array<TreeModule>,
    path: Array<number>
  ): TreeModule => {
    let [index, ...p] = path; // eslint-disable-line prefer-const
    let result = modules[index];
    while (p && p.length !== 0) {
      index = p.shift();
      if (result.modules === undefined) {
        throw new Error('wrong path');
      }
      result = result.modules[index];
    }
    return result;
  };

  pathAfter = (path: Array<number>): Array<number> => {
    const result = [...path];
    result[result.length - 1] += 1;
    return result;
  };

  getIdByPath = (path: Array<number>): string => (path ? path.join('-') : '');

  getParentPath = (path: Array<number>): Array<number> => path.slice(0, -1);

  eq = (p1: Array<number>, p2: Array<number>): boolean =>
    this.getIdByPath(p1) === this.getIdByPath(p2);

  comparePaths = (p1: Array<number>, p2: Array<number>): number => {
    const p1l = p1.length;
    const p2l = p2.length;
    if (!p1) {
      return 1;
    }
    if (!p2) {
      return -1;
    }
    for (let i = 0; i < p1l && i < p2l; i += 1) {
      if (p1[i] > p2[i]) {
        return 1;
      }
      if (p1[i] < p2[i]) {
        return -1;
      }
    }
    return 0;
  };

  findParentModules = (
    modules: Array<TreeModule>,
    path: Array<number>
  ): Array<TreeModule> => {
    let parent;
    if (path.length === 1) {
      parent = { modules };
    } else {
      parent = this.findByPath(modules, this.getParentPath(path));
    }
    if (parent.modules === undefined) {
      throw new Error('Invalid parent');
    }
    return parent.modules;
  };

  modifyAt = (
    modules: Array<TreeModule>,
    path: Array<number>,
    cb: TreeModule => void
  ) => {
    const entity = this.findByPath(modules, path);
    cb(entity);
  };

  push = (modules: Array<TreeModule>, module: TreeModule): void => {
    modules.push(module);
  };

  pathOnRemoved = (removePath: Array<number>, insertPath: Array<number>) => {
    const removeLen = removePath.length;
    const insertLen = insertPath.length;
    if (removeLen === 0 || removeLen >= insertLen) {
      return insertPath;
    }
    let i = 0;
    for (i = 0; i < removeLen - 1; i += 1) {
      if (removePath[i] !== insertPath[i]) {
        return insertPath;
      }
    }
    if (removePath[i] >= insertPath[i]) {
      return insertPath;
    }
    const result = [...insertPath];
    result[i] -= 1;
    return result;
  };

  insertAt = (
    modules: Array<TreeModule>,
    path: Array<number>,
    module: TreeModule
  ): void => {
    const parent = this.findParentModules(modules, path);
    if (parent.length === 0) {
      parent.unshift(module);
    } else {
      const index = path[path.length - 1];
      parent.splice(index, 0, module);
    }
  };

  replaceAt = (
    modules: Array<TreeModule>,
    path: Array<number>,
    module: TreeModule
  ): void => {
    const parent = this.findParentModules(modules, path);
    parent.splice(path[path.length - 1], 1, module);
  };

  removeAt = (modules: Array<TreeModule>, path: Array<number>): void => {
    const parent = this.findParentModules(modules, path);
    const index = path[path.length - 1];
    parent.splice(index, 1);
  };

  moveAt = (
    modules: Array<TreeModule>,
    from: Array<number>,
    to: Array<number>
  ): void => {
    const module = this.findByPath(modules, from);
    const path = this.pathOnRemoved(from, to);
    this.removeAt(modules, from);
    this.insertAt(modules, path, module);
  };
}
