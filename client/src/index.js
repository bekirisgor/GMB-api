import React from "react";
import ReactDOM from "react-dom";

import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "./ConfigureStore";
import App from "./app";
import * as serviceWorker from "./serviceWorker";

const history = createBrowserHistory();
const store = configureStore(undefined, history);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
