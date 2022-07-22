import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import Actors from './Actors';
import AddRating from './AddRating';
import App from './App';
import Directors from './Directors';
import LoginLogout from './LoginLogout';
import MovieGenreFilter from './MovieGenreFilter';
import MovieSearch from './MovieSearch';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoute';
import store from './redux-components/store';

const AppMain = () => {
  return (
  <div>
    {console.log('store stateee')}
    {console.log(store.getState())}
    {console.log('store stateee')}
    {store.getState() ?
      <Router>
        {/* <Link to='/app'>Login/ Register</Link> */}
        <Link to='/movieByGenre'>Movie By Genre</Link>
        <Link to='/movieSearch'>Movie Search</Link>
        <Link to='/movieByDirector'>Movie By Director</Link>
        <Link to='/movieByActor'>Movie By Actor</Link>
        <Route path='/app' component={App}></Route>
        <Route path='/movieByGenre' component={MovieGenreFilter}></Route>
        <Route path='/movieSearch' component={MovieSearch}></Route>
        <Route path='/movieByDirector' component={Directors}></Route>
        <Route path='/movieByActor' component={Actors}></Route>
        {/* <App />
        <MovieGenreFilter />
        <MovieSearch />
        <Directors /> */}
      </Router> : 
      <div>
        u need to authorize
        <App />
      </div>}
  </div>
  )
}

export default AppMain