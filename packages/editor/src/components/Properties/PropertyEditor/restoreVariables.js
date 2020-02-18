// @flow
import type { ContentState, ContentBlock } from 'draft-js';

import { findVariables } from '@expandorg/modules/model';

import { restoreEntities } from '../RichText';

export const findVarsRanges = (block: ContentBlock): Array<Object> =>
  findVariables(block.getText());

export const getVariableData = ({ variable, name }: Object) => ({
  mention: {
    name: variable,
    suggestion: name,
  },
});

export const restoreVariables = (content: ContentState) =>
  restoreEntities(
    content,
    '$mention',
    'IMMUTABLE',
    findVarsRanges,
    getVariableData
  );
