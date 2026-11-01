import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './index.css';
import * as Sentry from '@sentry/react';

// Initialize Sentry
Sentry.init({
  dsn: "https://9a395ef80df4643ead32a6c96cb8da26@o4512354425438208.ingest.de.sentry.io/4512354686795856",
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
