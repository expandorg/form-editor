import React from 'react';
import PropTypes from 'prop-types';

import styles from './Link.module.styl';

export function Link({ contentState, entityKey, children }) {
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a href={url} className={styles.link}>
      {children}
    </a>
  );
}

Link.propTypes = {
  contentState: PropTypes.shape({
    getEntity: PropTypes.func,
  }).isRequired,
  entityKey: PropTypes.string.isRequired,
};

export function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
}

export const linkPlugin = {
  decorators: [
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ],
};
