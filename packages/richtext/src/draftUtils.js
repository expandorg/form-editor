// @flow
import {
  Modifier,
  ContentState,
  EditorState,
  RichUtils,
  ContentBlock,
  SelectionState,
} from 'draft-js';

import cn from 'classnames';

import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

export const restoreEntities = (
  contentState: ContentState,
  type: string,
  mutability: string,
  rangeFinder: (block: ContentBlock) => Array<Object>,
  getEntityData: Object => Object
): ContentState => {
  let result = contentState;

  contentState.getBlockMap().forEach(block => {
    const blockKey = block.getKey();
    const ranges = rangeFinder(block);
    ranges.forEach(range => {
      const { start, end } = range;

      const selection = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: start,
        focusKey: blockKey,
        focusOffset: end,
      });
      result = result.createEntity(type, mutability, getEntityData(range));
      const entityKey = result.getLastCreatedEntityKey();

      result = Modifier.applyEntity(result, selection, entityKey);
    });
  });

  return result;
};

export const getHtml = (contentState: ContentState): string =>
  stateToHTML(contentState, {
    blockStyleFn: (block: any) => {
      const data = block.getData();
      if (data.get('ALIGNMENT')) {
        return {
          attributes: {
            class: `align-${data.get('ALIGNMENT')}`,
          },
        };
      }
      return null;
    },
  });

export const getText = (editorState: EditorState): string =>
  editorState.getCurrentContent().getPlainText();

export const isEmpty = (editorState: EditorState): boolean =>
  !editorState.getCurrentContent().hasText();

export const hasFocus = (editorState: EditorState): boolean =>
  editorState.getSelection().getHasFocus();

export const editorStateFromText = (
  value: string | number,
  restore: (c: ContentState) => ContentState = c => c,
  decorator: any = null
) => {
  if (value == null || value === undefined) {
    return EditorState.createEmpty(decorator);
  }
  let content = ContentState.createFromText(`${value}`);
  content = restore(content);
  return EditorState.createWithContent(content, decorator);
};

const clearHtml = (text: string) =>
  text.replace(/([^>]*)(?![^<]*>|[^<>]*<\/)/g, full =>
    !full || full === ' ' ? full : `<p>${full}</p>`
  );

export const editorStateFromHtml = (
  html: string,
  restore: (c: ContentState) => ContentState = c => c,
  decorator: any = null
) => {
  if (!html) {
    return EditorState.createEmpty(decorator);
  }

  let content = stateFromHTML(clearHtml(html), {
    customBlockFn: (element: HTMLElement) => {
      const alignCenter = element.classList.contains('align-center');
      const alignRight = element.classList.contains('align-right');
      if (alignCenter) {
        return { data: { ALIGNMENT: 'center' } };
      }
      if (alignRight) {
        return { data: { ALIGNMENT: 'right' } };
      }
      return null;
    },
  });

  content = restore(content);
  return EditorState.createWithContent(content, decorator);
};

export const getCurrentBlock = (editorState: EditorState) => {
  const selectionState = editorState.getSelection();
  const anchorKey = selectionState.getAnchorKey();
  const currentContent = editorState.getCurrentContent();
  return currentContent.getBlockForKey(anchorKey);
};

export const getActiveAlignment = (editorState: EditorState): string => {
  const currentBlock = getCurrentBlock(editorState);
  const data = currentBlock.getData();
  if (data) {
    const alignemnt = data.get('ALIGNMENT');
    if (alignemnt === 'right' || alignemnt === 'center') {
      return alignemnt;
    }
  }
  return 'left';
};

export const applyAlignment = (editorState: EditorState, alignemnt: string) => {
  const content = editorState.getCurrentContent();
  const selection = editorState.getSelection();

  const edited = Modifier.mergeBlockData(content, selection, {
    ALIGNMENT: alignemnt,
  });
  return EditorState.push(editorState, edited, 'change-block-data');
};

export const fontPresets = [
  { label: 'h1', value: 'header-one' },
  { label: 'h2', value: 'header-two' },
  { label: 'h3', value: 'header-three' },
  { label: 'h4', value: 'header-four' },
  { label: 'pre', value: 'code-block' },
  { label: 'body', value: 'unstyled' },
];

export const getCurrentFontPreset = (editorState: EditorState) =>
  RichUtils.getCurrentBlockType(editorState);

export const applyFontPreset = (editorState: EditorState, blockType: string) =>
  RichUtils.toggleBlockType(editorState, blockType);

export const blockStyleFn = (block: ContentBlock) => {
  const data = block.getData();

  const type = block.getType();
  const alignemnt = data.get('ALIGNMENT');
  return cn({
    [`DraftEditor-align-${alignemnt}`]: data.get('ALIGNMENT'),
    [`DraftEditor-block-type-${type}`]: type,
  });
};

export const insertVariable = (editorState: EditorState, value: string) => {
  let contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();

  contentState = contentState.createEntity('$mention', 'IMMUTABLE', {
    mention: {
      name: `$(${value})`,
      suggestion: value,
    },
  });

  const entityKey = contentState.getLastCreatedEntityKey();

  const modifierFn = selection.isCollapsed()
    ? Modifier.insertText
    : Modifier.replaceText;

  contentState = modifierFn(
    contentState,
    selection,
    `$(${value})`,
    null,
    entityKey
  );

  return EditorState.push(editorState, contentState, 'apply-entity');
};

const getSelectedLinkEntity = (editorState: EditorState) => {
  const contentState = editorState.getCurrentContent();
  const startKey = editorState.getSelection().getStartKey();
  const startOffset = editorState.getSelection().getStartOffset();
  const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
  const key = blockWithLinkAtBeginning.getEntityAt(startOffset);
  if (!key) {
    return null;
  }
  const instance = contentState.getEntity(key);
  if (instance.getType() !== 'LINK') {
    return null;
  }
  return instance;
};

export const getLinkValue = (editorState: EditorState): string => {
  const selection = editorState.getSelection();
  if (selection.isCollapsed()) {
    return '';
  }
  const link = getSelectedLinkEntity(editorState);
  if (!link) {
    return '';
  }
  return link.getData().url;
};

export const toggleLink = (editorState: EditorState, url: string) => {
  let contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();

  if (selection.isCollapsed()) {
    return editorState;
  }

  if (!url) {
    return RichUtils.toggleLink(editorState, selection, null);
  }

  contentState = contentState.createEntity('LINK', 'MUTABLE', {
    url,
    target: '_blank',
  });
  const entityKey = contentState.getLastCreatedEntityKey();
  contentState = Modifier.applyEntity(contentState, selection, entityKey);
  const edited = EditorState.set(editorState, { currentContent: contentState });
  return RichUtils.toggleLink(edited, edited.getSelection(), entityKey);
};
