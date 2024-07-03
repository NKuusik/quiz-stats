import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as rawData from './resources/seasons';

ReactDOM.render(
  <React.StrictMode>
    <App rawData={rawData} collapseWidth={500}/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
