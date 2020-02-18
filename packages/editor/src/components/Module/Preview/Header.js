/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useToggle } from '@expandorg/components';
import { ContextMenu, ContextMenuItem } from '@expandorg/components/app';

import { ReactComponent as Visible } from '@expandorg/uikit/assets/visible.svg';
import { ReactComponent as Invisible } from '@expandorg/uikit/assets/invisible.svg';

import { moduleProps } from '@expandorg/modules';

import { ReactComponent as MoreIcon } from '../../../assets/more.svg';
import { ReactComponent as DownIcon } from '../../../assets/arrow_drop_down.svg';

import styles from './Header.module.styl';

const isVisible = module => {
  return !module.logic.show;
};

export default function Header({
  module,
  nesting,
  collapsed,
  onSelect,
  onCopy,
  actions,
  onRemove,
  onToggleCollapse,
}) {
  const [menu, toggle] = useToggle();
  const copy = useCallback(() => {
    toggle();
    onCopy();
  }, [onCopy, toggle]);

  const remove = useCallback(() => {
    toggle();
    onRemove();
  }, [onRemove, toggle]);

  return (
    <div className={styles.container}>
      {nesting && (
        <button className={styles.toggle} onClick={onToggleCollapse}>
          <DownIcon
            className={cn(styles.arrow, { [styles.collapsed]: collapsed })}
          />
        </button>
      )}
      <div className={styles.name} onClick={onSelect}>
        {module.name}
      </div>
      <div className={styles.actions}>
        {module.logic && (isVisible(module) ? <Visible /> : <Invisible />)}
        <button onClick={toggle} className={styles.more}>
          <MoreIcon />
        </button>
        {menu && (
          <ContextMenu onHide={toggle}>
            {actions.has('copy') && (
              <ContextMenuItem onClick={copy}>Duplicate</ContextMenuItem>
            )}
            {/* <ContextMenuItem>Manage logic</ContextMenuItem> */}
            {actions.has('remove') && (
              <ContextMenuItem onClick={remove}>Delete</ContextMenuItem>
            )}
          </ContextMenu>
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  module: moduleProps.isRequired,
  collapsed: PropTypes.bool,
  nesting: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onToggleCollapse: PropTypes.func.isRequired,
  actions: PropTypes.instanceOf(Set).isRequired,
};

Header.defaultProps = {
  collapsed: false,
};
