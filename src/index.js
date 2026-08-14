import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, initializeIcons } from '@fluentui/react';
import './index.css';
import App from './App';

// mora se pozvati jednom, inace Fluent komponente nemaju ikonice
initializeIcons();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
