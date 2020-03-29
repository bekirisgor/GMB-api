import React from "react";
import Home from "./container/Home/index";
import AccTable from "./container/accounts";
import Location from "./container/locations";
import Reviews from "./container/Reviews";
import { Route, Switch, BrowserRouter as Router, Link } from "react-router-dom";
import SideBar from "./component/sidebar/sidebar";
import NavBar from "./component/navbar/navbar";
import { withRouter } from "react-router";
import { Container } from "semantic-ui-react";

export const App = () => (
  <div>
    <Container>
      <NavBar />
      <SideBar />

      <Switch>
        <Route path="/accounts">
          <AccTable />
        </Route>

        <Route path="/locations">
          <Location />
        </Route>

        <Route path="/reviews">
          <Reviews />
        </Route>

        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Container>
  </div>
);

export default App;
