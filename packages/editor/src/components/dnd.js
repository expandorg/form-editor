import { supportNesting } from '../common/modules';

import { treeEditor } from './Tree';

export const FORM_DND_ID = 'FORM_DND_ID';

export const nestedTarget = (onMove, path) => ({
  accept: FORM_DND_ID,
  hover: (_, monitor) => {
    if (!monitor.isOver({ shallow: true })) {
      return;
    }
    const item = monitor.getItem();
    const newPath = [...path, 0];
    onMove(item.path, newPath, item.meta);
    item.path = treeEditor.pathOnRemoved(item.path, newPath);
  },
});

export const nestedModuleTarget = {
  accept: FORM_DND_ID,
  canDrop: () => false,
};

export const dropAreaTarget = onAdd => ({
  accept: FORM_DND_ID,
  canDrop: (_, monitor) => {
    const { meta, path } = monitor.getItem();
    return !!meta && path.length === 0;
  },
  drop: (_, monitor) => {
    if (!monitor.didDrop()) {
      const { path, meta } = monitor.getItem();
      if (path.length === 0) {
        onAdd(meta);
      }
    }
  },
});

export const availableTarget = onRemoveModule => ({
  accept: FORM_DND_ID,
  drop: (_, monitor) => {
    const { path } = monitor.getItem();
    onRemoveModule(path);
  },
});

export const metaSource = (meta, onEndDrag) => ({
  item: {
    type: FORM_DND_ID,
    meta,
    path: [],
  },
  collect: monitor => ({
    isDragging: monitor.isDragging(),
  }),
  end: (_, monitor) => {
    onEndDrag(monitor.getItem().path);
  },
});

export const moduleSource = (id, path, onEndDrag, selection) => ({
  item: {
    type: FORM_DND_ID,
    id,
    path,
  },
  canDrag: () => {
    return !selection;
  },
  collect: monitor => ({
    isDragging: monitor.isDragging(),
  }),
  end: (_, monitor) => {
    onEndDrag(monitor.getItem().path);
  },
});

const getParentId = path =>
  treeEditor.getIdByPath(treeEditor.getParentPath(path));

const getControlEdges = (top, bottom, nesting, padding = 25) => {
  const topEdge = nesting ? padding : (bottom - top) / 2;
  const bottomEdge = nesting ? bottom - top - padding : (bottom - top) / 2;
  return [topEdge, bottomEdge];
};

export const moduleTarget = (ref, path, meta, onMove) => ({
  accept: FORM_DND_ID,
  hover: (_, monitor) => {
    if (!ref.current || !monitor.isOver({ shallow: true })) {
      return;
    }
    const item = monitor.getItem();

    if (treeEditor.eq(path, item.path)) {
      return;
    }

    const { top, bottom } = ref.current.getBoundingClientRect();

    const { y } = monitor.getClientOffset();
    const dragY = y - top;

    const nesting = supportNesting(meta);
    const [topEdge, bottomEdge] = getControlEdges(top, bottom, nesting);

    const compare = treeEditor.comparePaths(item.path, path);

    if (dragY < topEdge && compare > 0) {
      onMove(item.path, path, item.meta);
      item.path = treeEditor.pathOnRemoved(item.path, path);
      return;
    }

    if (dragY > bottomEdge && compare <= 0) {
      const sameLevel = getParentId(path) === getParentId(item.path);

      const movePath = sameLevel ? path : treeEditor.pathAfter(path);

      onMove(item.path, movePath, item.meta);
      item.path = treeEditor.pathOnRemoved(item.path, movePath);
    }
  },
});
