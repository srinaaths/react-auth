import React from 'react';
import ReactDOM from 'react-dom/client';
import AddRating from './AddRating';
import App from './App';
import LoginLogout from './LoginLogout';
import MovieGenreFilter from './MovieGenreFilter';
import MovieSearch from './MovieSearch';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    // <App />
    // <MovieGenreFilter />
    <MovieSearch />
  // </React.StrictMode>
);