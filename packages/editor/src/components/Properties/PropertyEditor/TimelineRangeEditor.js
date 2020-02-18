import React from 'react';

import LinkedValueEditor from './LinkedValueEditor';

const stringifyVal = v =>
  Reflect.ownKeys(v)
    .map(c => `${c}: ${v[c]}`)
    .join(', ');

const stringify = v => {
  if (typeof v === 'string') {
    return v;
  }
  if (Array.isArray(v)) {
    return v.map(val => stringifyVal(val)).join('\r\n\r\n');
  }
  return v ? stringifyVal(v) : undefined;
};

export default function TimelineRangeEditor(props) {
  return (
    <LinkedValueEditor
      stringifyValue={stringify}
      warning="Drag a range onto the timeline."
      {...props}
    />
  );
}

TimelineRangeEditor.withModuleProperties = true;
