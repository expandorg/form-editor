import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { useDrop } from 'react-dnd';

import { EditorContext } from '../EditorContext';
import { availableTarget } from '../dnd';

export default function DropArea({ children, className }) {
  const { onRemove } = useContext(EditorContext);

  const [, drop] = useDrop(availableTarget(onRemove));

  return (
    <div className={className} id="gems-components" ref={drop}>
      {children}
    </div>
  );
}

DropArea.propTypes = {
  className: PropTypes.string,
};

DropArea.defaultProps = {
  className: null,
};
