import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { CounsellingProvider } from './context/CounsellingContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CounsellingProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CounsellingProvider>
    </AuthProvider>
  </React.StrictMode>,
);
