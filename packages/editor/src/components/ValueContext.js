import React, { createContext, Component, forwardRef } from 'react';
import PropTypes from 'prop-types';

export const ValueContext = createContext();

const getInitialState = () => ({
  isValueEditable: false,
  moduleValue: undefined,
  moduleValues: undefined,
});

export class ValueContextProvider extends Component {
  static propTypes = {
    selection: PropTypes.shape({}),
  };

  static defaultProps = {
    selection: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      ...getInitialState(),
      selection: props.selection,
    };
  }

  static getDerivedStateFromProps({ selection }, state) {
    if (selection !== state.selection) {
      return {
        ...getInitialState(),
        selection,
      };
    }
    return null;
  }

  handleInputStart = (moduleName, moduleValue) => {
    this.setState({
      isValueEditable: true,
      moduleValue,
      moduleValues: { [moduleName]: moduleValue },
    });
  };

  handleInputEnd = () => {
    this.setState({ ...getInitialState() });
  };

  handleChange = (moduleName, moduleValue) => {
    this.setState({
      moduleValue,
      moduleValues: { [moduleName]: moduleValue },
    });
  };

  render() {
    const { children } = this.props;
    const { isValueEditable, moduleValue, moduleValues } = this.state;

    const ctx = {
      isValueEditable,
      moduleValue,
      moduleValues,
      onChangeValue: this.handleChange,
      onStartInput: this.handleInputStart,
      onEndInput: this.handleInputEnd,
    };

    return (
      <ValueContext.Provider value={ctx}>{children}</ValueContext.Provider>
    );
  }
}

export const withValueContext = Wrapped =>
  // eslint-disable-next-line react/no-multi-comp
  forwardRef((props, ref) => (
    <ValueContext.Consumer>
      {ctx => <Wrapped {...props} {...ctx} forwardedRef={ref} />}
    </ValueContext.Consumer>
  ));
