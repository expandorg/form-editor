import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Placeholder.module.styl';

const Placeholder = forwardRef(({ title, className }, ref) => (
  <div className={cn(styles.placehoder, className)} ref={ref}>
    {title}
  </div>
));

Placeholder.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

Placeholder.defaultProps = {
  title: 'Drop here',
  className: null,
};

export default Placeholder;
