import React from 'react';

import cn from 'classnames';

import { Tooltip } from '@expandorg/components';

import { ReactComponent as InfoMark } from '../../assets/circle-i.svg';

import styles from './I.module.styl';

const I = Tooltip(({ className, children, ...rest }) => (
  <span className={cn(styles.i, className)} {...rest}>
    <InfoMark width="18" height="18" viewBox="0 0 20 20" />
    {children}
  </span>
));

export default I;
