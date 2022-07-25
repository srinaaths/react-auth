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
import './AppMain.scss'

const AppMain = () => {
  return (
    <div>
      <div className="bg-img">
        <img src="https://c1.wallpaperflare.com/preview/570/413/91/interior-theatre-theater-empty-theater.jpg" alt="" />
      </div>
      {console.log('store stateee')}
      {console.log(store.getState())}
      {console.log('store stateee')}
      {store.getState() ?
        <Router >
          <div >
            {/* <Link to='/app'>Login/ Register</Link> */}
            <div className='div-main-class'>
              <Link className='link-class' to='/movieByGenre'>Movie By Genre</Link>
              <Link className='link-class' to='/movieSearch'>Movie Search</Link>
              <Link className='link-class' to='/movieByDirector'>Movie By Director</Link>
              {/* <Link className='link-class' to='/movieByActor'>Movie By Actor</Link> */}
            </div>
            <Route path='/app' component={App}></Route>
            <Route path='/movieByGenre' component={MovieGenreFilter}></Route>
            <Route path='/movieSearch' component={MovieSearch}></Route>
            <Route path='/movieByDirector' component={Directors}></Route>
            <Route path='/movieByActor' component={Actors}></Route>
          </div>
          {/* <App />
        <MovieGenreFilter />
        <MovieSearch />
        <Directors /> */}
        </Router> :
        <div className='main-container-class'>
          {/* u need to authorize */}
          <h1 className='main-header-class'>Movies App</h1>
          <App />
        </div>}
    </div>
  )
}

export default AppMain