import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Hello } from './Hello';
import { Login } from './Login';

export const App = () => {
  return (
    <Router>
        <Route path='/' exact component={Hello} />
        <Route path='/login' component={Login} />
        <Route path='/spotify' component={() => {
          // tslint:disable-next-line: max-line-length
          window.location.href = '';
          return undefined;
        }}/>
    </Router>
  );
};
