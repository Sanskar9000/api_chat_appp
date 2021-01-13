import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { APP_CABLE_URL } from './constants';
import actionCable from 'actioncable';

const cable = actionCable.createConsumer(APP_CABLE_URL)

ReactDOM.render(
  <React.StrictMode>
    <App cable={cable}/>
  </React.StrictMode>,
  document.getElementById('root')
);
