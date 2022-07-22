import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import AddRating from './AddRating';
import App from './App';
import Directors from './Directors';
import LoginLogout from './LoginLogout';
import MovieGenreFilter from './MovieGenreFilter';
import MovieSearch from './MovieSearch';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <div>
    <Router>
        <Link to='/app'>App</Link>
        <Link to='/movieByGenre'>Movie By Genre</Link>
        <Link to='/movieSearch'>Movie Search</Link>
        <Link to='/movieByDirector'>Movie By Director</Link>
        <Route path='/app' component={App}></Route>
        <Route path='/movieByGenre' component={MovieGenreFilter}></Route>
        <Route path='/movieSearch' component={MovieSearch}></Route>
        <Route path='/movieByDirector' component={Directors}></Route>
        {/* <App />
        <MovieGenreFilter />
        <MovieSearch />
        <Directors /> */}
    </Router>
  </div>
  // </React.StrictMode>
);