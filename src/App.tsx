import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { CacheRoute, CacheSwitch } from 'react-router-cache-route';

import Home from './pages/home';
import ApiLogin from './pages/api/Login';
import ApiSetting from './pages/api/ApiSetting';

function App() {
  return (
    <HashRouter>
      <CacheSwitch>
        <CacheRoute exact path="/" key="home" component={Home} />
        <Route exact path="/api/login" component={ApiLogin} />
        <Route exact path="/api/setting" component={ApiSetting} />
      </CacheSwitch>
    </HashRouter>
  );
}

export default App;
