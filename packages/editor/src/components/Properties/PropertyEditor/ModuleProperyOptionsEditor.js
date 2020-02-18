import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from '@expandorg/components';

import styles from './styles.module.styl';

export default class ModuleProperyOptionsEditor extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    moduleProperties: PropTypes.shape({}),
    label: PropTypes.string,
    dependency: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: undefined,
    moduleProperties: {},
    label: null,
    dependency: null,
  };

  handleChange = value => {
    const { onChange } = this.props;
    onChange(value);
  };

  static withModuleProperties = true;

  render() {
    const { value, label, moduleProperties, dependency } = this.props;
    const options = [...new Set(moduleProperties[dependency])];
    return (
      <Dropdown
        options={options}
        label={label}
        value={value}
        onChange={this.handleChange}
        className={styles.dropdown}
      />
    );
  }
}
