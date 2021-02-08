import React, { Component } from "react";

import { RootContext } from "../context/root-context";

class EventsPage extends Component {
  static contextType = RootContext;

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("context values in events page.....", this.context);
    return <h1> The Events Page</h1>;
  }
}

export default EventsPage;
