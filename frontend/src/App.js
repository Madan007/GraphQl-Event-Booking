import React, { Component } from "react";
import "./App.css";

import RootContextProvider from "./context/root-context";
import Router from "./Router";

class App extends Component {
  render() {
    return (
      <RootContextProvider>
        <Router />
      </RootContextProvider>
    );
  }
}

export default App;
