
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as rawData from './resources/seasons';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <App rawData={rawData} collapseWidth={900} />
    </React.StrictMode>
);

reportWebVitals();
