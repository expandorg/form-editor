import React from 'react';
import PropTypes from 'prop-types';

const Entity = ({ className, children }) => (
  <span className={className}>{children}</span>
);

Entity.propTypes = {
  className: PropTypes.string,
  mention: PropTypes.shape({
    name: PropTypes.string,
    suggestion: PropTypes.string,
  }).isRequired,
};

Entity.defaultProps = {
  className: null,
};

export default Entity;
