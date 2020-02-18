// @flow

import { treeEditor } from './editor';
import { type TreeModule } from './ModulesTreeEditor';

type SelectionType = 'edit' | 'logic' | 'none';

export default class Selection {
  static empty = new Selection('none');

  type: SelectionType = 'none';
  path: ?Array<number> = null;

  static select(
    path: Array<number>,
    current: Selection,
    type: SelectionType = 'edit'
  ): ?Selection {
    if (!path) {
      return Selection.empty;
    }
    if (!current || current.type !== type) {
      return new Selection(type, path);
    }

    return !treeEditor.eq(current.path, path)
      ? new Selection(type, path)
      : Selection.empty;
  }

  constructor(type: SelectionType, path?: ?Array<number> = null) {
    this.path = path;
    this.type = type;
  }

  isEmpty() {
    return this.isType('none');
  }

  isType(type: SelectionType): boolean {
    return type === this.type;
  }

  getId(type: SelectionType): ?string {
    if (!this.isType(type)) {
      return null;
    }
    return treeEditor.getIdByPath(this.path);
  }

  find(modules: Array<TreeModule>, type: SelectionType): ?TreeModule {
    if (!this.isType(type)) {
      return null;
    }
    return treeEditor.findByPath(modules, this.path);
  }
}
