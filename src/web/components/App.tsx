import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Login } from './Login';
import Home from './Home';

export const App = () => {
  return (
    <Router>
        <Route path='/' exact component={Login} />
        <Route path='/login' component={Home} />
        <Route path='/spotify' component={() => {
          // tslint:disable-next-line: max-line-length
          window.location.href = 'https://accounts.spotify.com/authorize?response_type=code&scope=user-read-recently-played%20user-top-read&client_id=8c92f3e56fb64a16b4ef6b25a0ea04cf&redirect_uri=http://localhost:9000/login';
          return undefined;
        }}/>
    </Router>
  );
};
