import ImmutableTreeBuilder from './ImmutableTreeBuilder';

export const treeEditor = new ImmutableTreeBuilder();

export const Ops = {
  Add: 'Add',
  EndDrag: 'EndDrag',
  Remove: 'Remove',
  Copy: 'Copy',
  Edit: 'Edit',
  Move: 'Move',
};
