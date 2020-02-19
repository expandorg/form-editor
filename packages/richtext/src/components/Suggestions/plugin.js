import Entity from './Entity';

import './styles.styl';

const options = {
  mentionComponent: Entity,
  entityMutability: 'IMMUTABLE',
  mentionTrigger: '$',
  mentionPrefix: '$',
};

export default options;
