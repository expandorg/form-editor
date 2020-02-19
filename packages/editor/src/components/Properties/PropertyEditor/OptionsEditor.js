import React, { Component } from 'react';
import PropTypes from 'prop-types';

import nanoid from 'nanoid';

import { DraftTextInput } from '@expandorg/richtext';

import { ReactComponent as X } from '@expandorg/uikit/assets/x.svg';

import { removeAtIndex, replaceAtIndex } from '../../../common/utils';

import { restoreVariables } from './restoreVariables';

import styles from './OptionsEditor.module.styl';

const getOptions = values => values.map(value => ({ value, id: nanoid() }));

const getValues = options => options.map(({ value }) => value);

export default class OptionsEditor extends Component {
  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.string),
    variables: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired,
    onToggleVarsDialog: PropTypes.func,
  };

  static defaultProps = {
    value: [''],
    variables: [],
    onToggleVarsDialog: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      options: getOptions(props.value),
    };
  }

  handleChangeValue = (value, idx) => {
    const { onChange } = this.props;
    const { options } = this.state;
    const { id } = options[idx];

    const modified = replaceAtIndex(options, idx, { id, value });
    this.setState({ options: modified });
    onChange(getValues(modified));
  };

  handleRemoveClick = idx => {
    const { onChange } = this.props;
    const { options } = this.state;

    const modified = removeAtIndex(options, idx);
    this.setState({ options: modified });
    onChange(getValues(modified));
  };

  handleAddClick = () => {
    const { onChange } = this.props;
    const { options } = this.state;

    const modified = [...options, { value: '', id: nanoid() }];
    this.setState({ options: modified });
    onChange(getValues(modified));
  };

  render() {
    const { variables, onToggleVarsDialog } = this.props;
    const { options } = this.state;
    /* eslint-disable react/no-array-index-key */
    return (
      <div className={styles.container}>
        <DraftTextInput
          value={options[0].value}
          autocomplete={variables}
          placeholder="Default Option 1"
          onChange={v => this.handleChangeValue(v, 0)}
          restoreEntities={restoreVariables}
          className={styles.default}
          onToggleVarsDialog={onToggleVarsDialog}
        />
        {options.slice(1, options.length).map((o, idx) => (
          <div className={styles.item} key={o.id}>
            <DraftTextInput
              value={o.value}
              autocomplete={variables}
              placeholder={`Option ${idx + 2}`}
              className={styles.option}
              onChange={v => this.handleChangeValue(v, idx + 1)}
              restoreEntities={restoreVariables}
              onToggleVarsDialog={onToggleVarsDialog}
            />
            <button
              className={styles.remove}
              onClick={() => this.handleRemoveClick(idx + 1)}
            >
              <X />
            </button>
          </div>
        ))}
        <button onClick={this.handleAddClick} className={styles.add}>
          + Add option
        </button>
      </div>
    );
  }
}
