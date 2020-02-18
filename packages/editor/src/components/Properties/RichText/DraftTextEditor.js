import React, { Component } from 'react';
import PropTypes from 'prop-types';

import debounce from 'debounce';

import { RichUtils } from 'draft-js';

import Editor from 'draft-js-plugins-editor';
import createMentionPlugin from 'draft-js-mention-plugin';

import {
  FontStyleTool,
  AlignmentTool,
  FontPresetTool,
  VariablesButton,
  LinkTool,
  ListTool,
} from './toolbar';

import { linkPlugin } from './toolbar/Link/Link';

import {
  suggestionsOptions,
  formatSuggestions,
  suggestionsFilter,
  SuggestionsEntry,
} from './suggest';

import {
  getHtml,
  editorStateFromHtml,
  blockStyleFn,
  insertVariable,
} from './content';

import styles from './DraftTextEditor.module.styl';

const DEBOUNCE_TIMEOUT = 150;

// FIXME: class is uncotrolled
export default class DraftTextEditor extends Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    autocomplete: PropTypes.arrayOf(PropTypes.string),
    restoreEntities: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onToggleVarsDialog: PropTypes.func,
  };

  static defaultProps = {
    value: undefined,
    autocomplete: [],
    restoreEntities: undefined,
    placeholder: undefined,
    onToggleVarsDialog: null,
  };

  constructor(props) {
    super(props);

    this.mentionPlugin = createMentionPlugin(suggestionsOptions);

    this.saveChanges = debounce(this.saveChanges, DEBOUNCE_TIMEOUT);

    this.state = {
      autocomplete: formatSuggestions(props.autocomplete),
      editorState: editorStateFromHtml(props.value, props.restoreEntities),
    };
  }

  componentWillUnmount() {
    this.saveChanges.clear();
  }

  saveChanges = contentState => {
    const { onChange } = this.props;
    const html = getHtml(contentState);
    onChange(html);
  };

  handleChange = editorState => {
    this.setState({ editorState });
    this.saveChanges(editorState.getCurrentContent());
  };

  handleKeyCommand = command => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.setState({ editorState: newState });
      return 'handled';
    }
    return 'not-handled';
  };

  handleSearchChange = ({ value }) => {
    const { autocomplete } = this.props;
    this.setState({
      autocomplete: suggestionsFilter(value, autocomplete),
    });
  };

  handleSelectVar = (variable, value) => {
    const { editorState } = this.state;
    this.handleChange(insertVariable(editorState, value));
  };

  render() {
    const {
      placeholder,
      autocomplete: allVars,
      onToggleVarsDialog,
    } = this.props;
    const { editorState, autocomplete } = this.state;

    const { MentionSuggestions } = this.mentionPlugin;

    return (
      <div className={styles.container}>
        <div className={styles.toolbar}>
          <FontPresetTool
            editorState={editorState}
            onChange={this.handleChange}
          />
          <FontStyleTool
            editorState={editorState}
            onChange={this.handleChange}
          />
          <LinkTool editorState={editorState} onChange={this.handleChange} />
          <AlignmentTool
            editorState={editorState}
            onChange={this.handleChange}
          />
          <ListTool editorState={editorState} onChange={this.handleChange} />
          <VariablesButton
            variables={allVars}
            onSelect={this.handleSelectVar}
            onToggleVarsDialog={onToggleVarsDialog}
          />
        </div>
        <div className={styles.content}>
          <Editor
            placeholder={placeholder}
            className={styles.editor}
            editorState={editorState}
            plugins={[this.mentionPlugin, linkPlugin]}
            onChange={this.handleChange}
            handleKeyCommand={this.handleKeyCommand}
            blockStyleFn={blockStyleFn}
          />
          <MentionSuggestions
            onSearchChange={this.handleSearchChange}
            suggestions={autocomplete}
            entryComponent={SuggestionsEntry}
          />
        </div>
      </div>
    );
  }
}
