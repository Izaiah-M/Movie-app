import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Home from './Pges/Home';
import Show from './Pges/Show';
import Starred from './Pges/Starred';

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/show/:id">
          <Show />
        </Route>

        <Route exact path="/starred">
          <Starred />
        </Route>

        <Route>This is 404 page</Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
