import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { CacheRoute, CacheSwitch } from 'react-router-cache-route';

import Home from './pages/home';

function App() {
  return (
    <HashRouter>
      <CacheSwitch>
        <CacheRoute exact path="/" key="home" component={Home} />
      </CacheSwitch>
    </HashRouter>
  );
}

export default App;
