import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { CacheRoute, CacheSwitch } from 'react-router-cache-route';

import Home from './pages/home';
import ApiLogin from './pages/api/login';

function App() {
  return (
    <HashRouter>
      <CacheSwitch>
        <CacheRoute exact path="/" key="home" component={Home} />
        <Route exact path="/api/login" component={ApiLogin} />
      </CacheSwitch>
    </HashRouter>
  );
}

export default App;
