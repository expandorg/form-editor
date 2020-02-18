import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';

import { DraftTextInput } from '../RichText';
import { restoreVariables } from './restoreVariables';
import { withValueContext } from '../../ValueContext';

import styles from './LinkedValueEditor.module.styl';

class LinkedValueEditor extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    warning: PropTypes.string.isRequired,
    stringifyValue: PropTypes.func.isRequired,

    variables: PropTypes.arrayOf(PropTypes.string),
    moduleProperties: PropTypes.any, // eslint-disable-line

    value: PropTypes.any, // eslint-disable-line
    onChange: PropTypes.func.isRequired,

    isValueEditable: PropTypes.bool.isRequired,
    moduleValue: PropTypes.any, // eslint-disable-line
    onStartInput: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func.isRequired,
    onEndInput: PropTypes.func.isRequired,
    onToggleVarsDialog: PropTypes.func,
  };

  static defaultProps = {
    moduleValue: null,
    variables: [],
    onToggleVarsDialog: null,
  };

  handleSelectVar = variable => {
    const {
      onChangeValue,
      isValueEditable,
      onChange,
      moduleProperties,
    } = this.props;

    if (isValueEditable) {
      onChangeValue(moduleProperties.name, variable);
    } else {
      onChange(variable);
    }
  };

  handleClear = () => {
    this.handleSelectVar(undefined);
  };

  handleStart = () => {
    const { value, onStartInput, moduleProperties } = this.props;
    onStartInput(moduleProperties.name, value);
  };

  handleSave = () => {
    const { moduleValue, onEndInput, onChange } = this.props;
    onChange(moduleValue);
    onEndInput();
  };

  render() {
    const {
      title,
      value,
      warning,
      isValueEditable,
      moduleValue,
      variables,
      onEndInput,
      onToggleVarsDialog,
      stringifyValue,
    } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.inputContainer}>
            <DraftTextInput
              className={styles.input}
              autocomplete={variables}
              readOnly
              value={stringifyValue(isValueEditable ? moduleValue : value)}
              restoreEntities={restoreVariables}
              placeholder={title}
              onSelectVar={this.handleSelectVar}
              onToggleVarsDialog={onToggleVarsDialog}
            />
          </div>
          <button className={styles.clear} onClick={this.handleClear}>
            ✕
          </button>
        </div>
        {!isValueEditable && (
          <div className={styles.actions}>
            <Button className={styles.button} onClick={this.handleStart}>
              set {title}
            </Button>
          </div>
        )}
        {isValueEditable && (
          <>
            <div className={styles.warning}>{warning}</div>
            <div className={styles.actions}>
              <Button
                className={styles.button}
                theme="grey"
                onClick={onEndInput}
              >
                Cancel
              </Button>
              <Button className={styles.button} onClick={this.handleSave}>
                Finihed
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withValueContext(LinkedValueEditor);
