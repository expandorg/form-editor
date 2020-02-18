import { Component } from 'react';
import PropTypes from 'prop-types';

import { replaceAtIndex } from '../../../../common/utils';

const hasNested = expr => {
  if (!expr.length) {
    return false;
  }
  return Array.isArray(expr[0]);
};

const addExpr = (expr, op) => {
  if (hasNested(expr)) {
    return expr.concat([op, []]);
  }
  return [expr, op, []];
};

export default class NestedExpression extends Component {
  static propTypes = {
    expression: PropTypes.arrayOf(PropTypes.any).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleAdd = () => {
    const { expression, onChange } = this.props;
    onChange(addExpr(expression, '||'));
  };

  handleChange = (value, index) => {
    const { expression, onChange } = this.props;
    return onChange(replaceAtIndex(expression, index, value));
  };

  handleRemove = index => {
    const { expression, onChange } = this.props;
    const changed = [
      ...expression.slice(0, index),
      ...expression.slice(index + 2),
    ];
    return onChange(changed.length === 1 ? changed[0] : changed);
  };

  render() {
    const { expression, children, onChange } = this.props;

    if (!hasNested(expression)) {
      return children({
        key: 0,
        expression,
        op: null,
        onChangeExpr: onChange,
        onAdd: this.handleAdd,
      });
    }
    const len = expression.length;

    return expression.map((expr, index) => {
      if (index % 2 !== 0) {
        return null;
      }
      const last = index + 1 === len;
      return children({
        key: index,
        expression: expr,
        op: last ? null : expression[index + 1],
        onChangeExpr: value => this.handleChange(value, index),
        onChangeOp: last ? null : value => this.handleChange(value, index + 1),
        onAdd: last ? this.handleAdd : null,
        onRemove: last ? null : () => this.handleRemove(index),
      });
    });
  }
}
