import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import Tabs from "./Tabs";
import "./styles/index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

/**
 * Root of react site
 *
 * Imports Helmet provider for the page head
 * And App which defines the content and navigation
 */

// Render the site https://reactjs.org/docs/react-dom.html#render
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div>
        <Tabs/>
        <Switch>
          <Route path="/:subjectId" component={App} />
          <Route path="/" component={App} />
        </Switch>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
