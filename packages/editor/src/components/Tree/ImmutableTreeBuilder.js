// @flow
import immer from 'immer';
import ModulesTreeEditor, { type TreeModule } from './ModulesTreeEditor';

export default class ImmutableTreeBuilder {
  builder = new ModulesTreeEditor();

  findByPath = (modules: Array<TreeModule>, path: Array<number>): TreeModule =>
    this.builder.findByPath(modules, path);

  pathOnRemoved = (removePath: Array<number>, insertPath: Array<number>) =>
    this.builder.pathOnRemoved(removePath, insertPath);

  pathAfter = (path: Array<number>): Array<number> =>
    this.builder.pathAfter(path);

  getIdByPath = (path: Array<number>): string => this.builder.getIdByPath(path);

  getParentPath = (path: Array<number>): Array<number> =>
    this.builder.getParentPath(path);

  comparePaths = (p1: Array<number>, p2: Array<number>): number =>
    this.builder.comparePaths(p1, p2);

  eq = (p1: Array<number>, p2: Array<number>): boolean =>
    this.builder.eq(p1, p2);

  push = (modules: Array<TreeModule>, module: TreeModule): Array<TreeModule> =>
    immer(modules, draft => this.builder.push(draft, module));

  modifyAt = (
    modules: Array<TreeModule>,
    path: Array<number>,
    cb: TreeModule => void
  ) => immer(modules, draft => this.builder.modifyAt(draft, path, cb));

  removeAt = (
    modules: Array<TreeModule>,
    path: Array<number>
  ): Array<TreeModule> =>
    immer(modules, draft => this.builder.removeAt(draft, path));

  insertAt = (
    modules: Array<TreeModule>,
    path: Array<number>,
    module: TreeModule
  ): Array<TreeModule> =>
    immer(modules, draft => this.builder.insertAt(draft, path, module));

  replaceAt = (
    modules: Array<TreeModule>,
    path: Array<number>,
    module: TreeModule
  ): Array<TreeModule> =>
    immer(modules, draft => this.builder.replaceAt(draft, path, module));

  moveAt = (
    modules: Array<TreeModule>,
    from: Array<number>,
    to: Array<number>
  ): Array<TreeModule> =>
    immer(modules, draft => this.builder.moveAt(draft, from, to));
}
