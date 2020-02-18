import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { moduleProps } from '@expandorg/modules';

import { ModuleLogic as ML } from './logic';

import { If, Action, ConditionalExpression } from './Statements';

const getInitialState = ({ logic }) => {
  if (!logic || !(logic.show || logic.hide)) {
    return { expression: [], action: 'show' };
  }
  return {
    expression: logic.show ? logic.show : logic.hide,
    action: logic.show ? 'show' : 'hide',
  };
};

const visibilityActions = ['hide', 'show'];

export default function VisibilityLogic({
  module,
  variables,
  values,
  onChange,
}) {
  const options = useMemo(() => [...(variables || []), ...(values || [])], [
    values,
    variables,
  ]);

  const { expression, action } = getInitialState(module);

  const changeExpression = exp => {
    onChange(ML.set(module, action, exp));
  };

  const changeAction = updated => {
    onChange(ML.set(ML.unset(module, action), updated, expression));
  };

  return (
    <div>
      <If>
        <ConditionalExpression
          expression={expression}
          options={options}
          onChange={changeExpression}
        />
      </If>
      <Action
        name={module.name}
        actions={visibilityActions}
        action={action}
        onChange={changeAction}
      />
    </div>
  );
}

VisibilityLogic.propTypes = {
  module: moduleProps.isRequired,
  variables: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};

VisibilityLogic.defaultProps = {
  variables: [],
  values: [],
};
