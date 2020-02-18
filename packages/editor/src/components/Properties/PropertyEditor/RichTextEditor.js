import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { DraftTextEditor } from '../RichText';
import { restoreVariables } from './restoreVariables';

export default function RichTextEditor({
  placeholder,
  value,
  onChange,
  variables,
  onToggleVarsDialog,
}) {
  const handleChange = useCallback(
    v => {
      onChange(v);
    },
    [onChange]
  );

  return (
    <DraftTextEditor
      value={value}
      autocomplete={variables}
      restoreEntities={restoreVariables}
      onChange={handleChange}
      placeholder={placeholder}
      onToggleVarsDialog={onToggleVarsDialog}
    />
  );
}

RichTextEditor.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  variables: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onToggleVarsDialog: PropTypes.func,
};

RichTextEditor.defaultProps = {
  value: undefined,
  variables: [],
  placeholder: undefined,
  onToggleVarsDialog: null,
};
