import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { APP_CABLE_URL } from './constants';
import actionCable from 'actioncable';
import { BrowserRouter as Router } from 'react-router-dom';

const CableApp = {};
CableApp.cable = actionCable.createConsumer(APP_CABLE_URL);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App cableApp={CableApp} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
