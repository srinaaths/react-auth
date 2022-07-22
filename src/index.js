import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import Actors from './Actors';
import AddRating from './AddRating';
import App from './App';
import App2 from './AppMain';
import Directors from './Directors';
import LoginLogout from './LoginLogout';
import MovieGenreFilter from './MovieGenreFilter';
import MovieSearch from './MovieSearch';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoute';
import store from './redux-components/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App2 />
  // </React.StrictMode>
);