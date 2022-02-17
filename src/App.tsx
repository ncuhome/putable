import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { CacheRoute, CacheSwitch } from 'react-router-cache-route';

import Home from './pages/Home';
import './lib/mock/mock'
import {LoadingProvider} from "./components/loading";
import {NoticeProvider} from "./components/notice";

function App() {
  return (
    <LoadingProvider>
      <NoticeProvider>
        <HashRouter>
          <CacheSwitch>
            <CacheRoute exact path="/" key="home" component={Home} />
          </CacheSwitch>
        </HashRouter>
      </NoticeProvider>
    </LoadingProvider>
  );
}

export default App;
