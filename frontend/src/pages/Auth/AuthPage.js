import React, { Component } from "react";

import { UserService } from "./AuthPageServices";
import { RootContext } from "../../context/root-context";

import "./AuthPage.css";

class AuthPage extends Component {
  static contextType = RootContext;
  constructor(props, context) {
    super(props, context);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
    this.state = {
      loginMode: false,
    };
  }

  handleUserContext = async (userInfo, action) => {
    switch (action) {
      case "Login":
        const { token, userId, tokenExpiration } = userInfo.data.login;
        if (token && userId) {
          const contextData = {
            token,
            userId,
            tokenExpiration,
          };
          await this.context.updateContext(contextData);
        }
        break;
      case "Signup":
        break;
      default:
        break;
    }
  };

  submitHandler = async (event) => {
    try {
      event.preventDefault();
      const email = this.emailEl.current.value;
      const password = this.passwordEl.current.value;

      const action = this.state.loginMode ? "Login" : "Signup";
      if (email.trim().length === 0 || password.trim().length === 0) {
        return;
      }
      const response = await UserService({ email, password }, action);
      await this.handleUserContext(response, action);
    } catch (err) {
      console.log("Error while creating user ....", err);
    }
  };

  switchModeHandler = (e) => {
    this.setState((prevState) => {
      return { loginMode: !prevState.loginMode };
    });
  };

  render() {
    const { loginMode } = this.state;
    return (
      <form className="auth-form" onSubmit={(e) => this.submitHandler(e)}>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" ref={this.emailEl}></input>
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordEl}></input>
        </div>
        <div className="form-actions">
          <button type="submit">{loginMode ? "Login" : "Signup"}</button>
          <button type="button" onClick={(e) => this.switchModeHandler(e)}>
            {" "}
            Switch To {loginMode ? "SignUp" : "Login"}
          </button>
        </div>
      </form>
    );
  }
}

export default AuthPage;
