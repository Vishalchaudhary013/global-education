import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/app/App.jsx';
import './index.css';
import { AuthProvider } from '@/features/auth';
import { CounsellingProvider } from '@/features/counselling';

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
