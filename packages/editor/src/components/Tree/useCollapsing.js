import { useCallback, useState } from 'react';

export default function useCollapsing() {
  const [collapsed, setCollapsed] = useState({});

  const toggle = useCallback(
    id => {
      setCollapsed({ ...collapsed, [id]: !collapsed[id] });
    },
    [collapsed]
  );
  const clear = useCallback(() => setCollapsed({}), []);

  return [collapsed, toggle, clear];
}
