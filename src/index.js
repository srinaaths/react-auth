import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LoginLogout from './LoginLogout';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);