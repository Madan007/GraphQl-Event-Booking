import React, { Fragment } from "react";

import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { AuthPage, BookingsPage, EventsPage } from "./pages";
import MainNavigation from "./components/navigation/MainNavigation";
import { RootContext } from "./context/root-context";

const Router = () => (
  <RootContext.Consumer>
    {(context) => {
      return (
        <BrowserRouter>
          <Fragment>
            <MainNavigation />
            <main className="main-content">
              <Switch>
                {!context.token && <Redirect from="/" to="/auth" exact />}

                {context.token && <Redirect from="/" to="/events" exact />}
                {context.token && <Redirect from="/auth" to="/events" exact />}

                {!context.token && <Route path="/auth" component={AuthPage} />}

                <Route path="/events" component={EventsPage} />

                {context.token && (
                  <Route path="/bookings" component={BookingsPage} />
                )}
              </Switch>
            </main>
          </Fragment>
        </BrowserRouter>
      );
    }}
  </RootContext.Consumer>
);

export default Router;
