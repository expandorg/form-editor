const type = 'CHILDREN_MODULES_DND_ID';

export const source = (index, onEndDrag) => ({
  item: {
    index,
    type,
  },
  collect: monitor => ({
    isDragging: monitor.isDragging(),
  }),
  end: () => {
    onEndDrag();
  },
});

export const target = (ref, hoverIndex, onDrag) => ({
  accept: type,
  hover: (item, monitor) => {
    if (!ref.current || hoverIndex === item.index) {
      return;
    }
    const hoverBoundingRect = ref.current.getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (item.index < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    if (item.index > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    onDrag(item.index, hoverIndex);
    item.index = hoverIndex;
  },
});
