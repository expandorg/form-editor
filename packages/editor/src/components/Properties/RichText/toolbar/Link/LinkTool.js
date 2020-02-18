import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Tooltip,
  useClickOutside,
  useToggle,
  Button,
  Input,
} from '@expandorg/components';

import { toggleLink, getLinkValue } from '../../content';

import { ReactComponent as IconLink } from '../../assets/link.svg';

import styles from './LinkTool.module.styl';

const Btn = Tooltip(({ className, children, ...rest }) => (
  <button className={styles.btn} {...rest}>
    {children}
  </button>
));

// eslint-disable-next-line react/prop-types
function LinkDialog({ onHide, value, onSave }) {
  const ref = useRef(null);
  const [val, setVal] = useState(value || '');

  const change = useCallback(({ target }) => setVal(target.value), []);
  const save = useCallback(() => {
    onHide();
    onSave(val);
  }, [onHide, onSave, val]);

  useClickOutside(ref, onHide);
  return (
    <div className={styles.dialog} ref={ref}>
      <div className={styles.inner}>
        <Input placeholder="link url" value={val} onChange={change} />
        <Button
          size="small"
          theme="link"
          className={styles.save}
          onClick={save}
        >
          save
        </Button>
      </div>
    </div>
  );
}

export default function LinkTool({ editorState, onChange }) {
  const [dialog, toggleDialog] = useToggle(false);

  const save = useCallback(
    link => {
      onChange(toggleLink(editorState, link));
    },
    [editorState, onChange]
  );

  return (
    <div className={styles.container}>
      <Btn onClick={toggleDialog} tooltip="Link">
        <IconLink />
      </Btn>
      {dialog && (
        <LinkDialog
          onHide={toggleDialog}
          value={getLinkValue(editorState)}
          onSave={save}
        />
      )}
    </div>
  );
}

LinkTool.propTypes = {
  editorState: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};
