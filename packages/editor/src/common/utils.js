import immer from 'immer';
// @flow

// eslint-disable-next-line import/prefer-default-export
export const fastCopy = (original: Object): Object =>
  JSON.parse(JSON.stringify(original));

export const dndReplace = (
  collection: Array<any>,
  dragIndex: number,
  hoverIndex: number
): Array<any> => {
  const dragged = collection[dragIndex];
  const hovered = collection[hoverIndex];
  return immer(collection, d => {
    d[dragIndex] = hovered;
    d[hoverIndex] = dragged;
  });
};

export const range = (count: number): Array<number> => [...Array(count).keys()];

export const removeAtIndex = (array: Array<any>, index: number) => [
  ...array.slice(0, index),
  ...array.slice(index + 1),
];

export const replaceAtIndex = (
  array: Array<any>,
  index: number,
  item: ?any
) => [...array.slice(0, index), item, ...array.slice(index + 1)];

export const insertAtIndex = (array: Array<any>, index: number, item: ?any) => [
  ...array.slice(0, index),
  item,
  ...array.slice(index),
];
