import React, { Component } from "react";

export const RootContext = React.createContext();

class RootContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      userId: null,
      updateContext: this.updateContext,
    };
  }

  updateContext = (newState) => {
    this.setState({ ...this.state, ...newState });
  };

  render() {
    return (
      <RootContext.Provider value={this.state}>
        {" "}
        {this.props.children}
      </RootContext.Provider>
    );
  }
}

export default RootContextProvider;
