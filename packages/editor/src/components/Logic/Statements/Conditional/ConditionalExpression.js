import React from 'react';
import PropTypes from 'prop-types';

import SubExpression from './SubExpression';
import NestedExpression from './NestedExpression';

export default function ConditionalExpression({
  expression,
  options,
  onChange,
}) {
  return (
    <NestedExpression onChange={onChange} expression={expression}>
      {({
        key,
        expression: expr,
        op,
        onChangeExpr,
        onChangeOp,
        onAdd,
        onRemove,
      }) => (
        <SubExpression
          key={key}
          expression={expr}
          options={options}
          op={op}
          onChange={onChangeExpr}
          onChangeOp={onChangeOp}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      )}
    </NestedExpression>
  );
}

ConditionalExpression.propTypes = {
  expression: PropTypes.arrayOf(PropTypes.any),
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

ConditionalExpression.defaultProps = {
  expression: [],
};
