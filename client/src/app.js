import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Home from './container/Home/index';
import { AccTable } from './container/accounts';
import Location from './container/locations';
import Reviews from './container/Reviews';
import SideBar from './component/sidebar/sidebar';
import NavBar from './component/navbar/navbar';

const App = () => (
  <Container style={{ marginTop: '200px' }}>
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
);
export default App;
