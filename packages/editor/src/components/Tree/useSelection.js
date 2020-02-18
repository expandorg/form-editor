import { useCallback, useState } from 'react';
import Selection from './Selection';
import { fastCopy } from '../../common/utils';

export default function useSelection() {
  const [selection, setSelection] = useState(Selection.empty);
  const [selected, editSelected] = useState(null);

  const select = useCallback(
    (path, module, type) => {
      const s = Selection.select(path, selection, type);
      editSelected(s.isEmpty() ? null : fastCopy(module));
      setSelection(s);
    },
    [selection]
  );

  const deselect = useCallback(() => {
    editSelected(null);
    setSelection(Selection.empty);
  }, []);

  return [selection, select, deselect, selected, editSelected];
}
