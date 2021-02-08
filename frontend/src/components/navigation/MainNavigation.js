import React, { Fragment } from "react";

import { NavLink } from "react-router-dom";

import { RootContext } from "../../context/root-context";

import "./MainNavigation.css";

const MainNavigation = (props) => (
  <RootContext.Consumer>
    {(context) => {
      return (
        <header className="main-navigation">
          <div className="main-navigation-logo">
            <h1> Easy Event </h1>
          </div>
          <nav className="main-navigation-items">
            <ul>
              {!context.token && (
                <li>
                  <NavLink to="/auth">Authenticate</NavLink>
                </li>
              )}
              <li>
                <NavLink to="/events">Events</NavLink>
              </li>
              {context.token && (
                <Fragment>
                  <li>
                    <NavLink to="/bookings">Bookings</NavLink>
                  </li>
                  <li>
                    <button>Logout</button>
                  </li>
                </Fragment>
              )}
            </ul>
          </nav>
        </header>
      );
    }}
  </RootContext.Consumer>
);

export default MainNavigation;
