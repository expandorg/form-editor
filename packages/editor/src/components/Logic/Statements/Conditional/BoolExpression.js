import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown, Input } from '../components';

import styles from './BoolExpression.module.styl';

function getValues(expr) {
  if (!expr.length) {
    return ['', '==', ''];
  }
  return expr.map(v => (v === null ? 'null' : v));
}

const ops = ['>', '<', '>=', '<=', '==', '!='];

export default function BoolExpression({ options, expression, onChange }) {
  const [o1, op, o2] = getValues(expression);
  return (
    <>
      <Input
        value={o1}
        className={styles.input}
        options={options}
        onChange={({ target }) => onChange([target.value, op, o2])}
        onSelect={value => onChange([`$(${value})`, op, o2])}
      />
      <span className={styles.is}>is</span>
      <Dropdown
        value={op}
        className={styles.dd}
        options={ops}
        onChange={value => onChange([o1, value, o2])}
      />
      <Input
        value={o2}
        className={styles.input}
        options={options}
        onChange={({ target }) => onChange([o1, op, target.value])}
        onSelect={value => onChange([o1, op, `$(${value})`])}
      />
    </>
  );
}

BoolExpression.propTypes = {
  expression: PropTypes.arrayOf(PropTypes.string).isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};
