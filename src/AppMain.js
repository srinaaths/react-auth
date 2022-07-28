import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import Home from './Home';

const AppMain = () => {
  const [loggedIn, setLoggedIn] = useState(false)
    const userAuthenticated = async () => {
        const res = await axios.get('http://localhost:8080/isuserauth'
            ,
            {
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                }
            }
        )
        console.log(res);
        console.log(res);
        if (res.data.isAuthenticated) {
            const userIdentity = res.data.userId
            store.dispatch({
                type: 'USER_LOGIN',
                payload: {
                    id: res.data.userId,
                    token: localStorage.getItem('token'),
                    authStatus: true
                }
            })
            console.log(store.getState());
            console.log('store configured');
            console.log(store.getState());
            setLoggedIn(true)
        }
        else {
            console.log('auth set to false');
            store.dispatch({ type: 'USER_LOGOUT' })
        }
    }
  useEffect(() => {
    userAuthenticated();
    // if (localStorage.getItem('token') && localStorage.getItem('user')) {
    //   const loggedUserId = localStorage.getItem('user')
    //   console.log('in use effect');
    //   store.dispatch({
    //     type: 'USER_LOGIN',
    //     payload: {
    //       id: loggedUserId,
    //       isAdmin: true,
    //       authStatus: true,
    //       token: null
    //     }
      // })
      // console.log('done use effect');
    // }

  }, [])
    const logoutFunction = async () => {
        console.log('called');
        store.dispatch({ type: 'USER_LOGOUT' })
        console.log(store.getState());
        setLoggedIn(false)
    }
  return (
    <div>
      {console.log(`set logged in is ${loggedIn}`)}
      <div className="bg-img">
        <img src="https://c1.wallpaperflare.com/preview/570/413/91/interior-theatre-theater-empty-theater.jpg" alt="" />
      </div>
      {console.log('store stateee')}
      {console.log(store.getState())}
      {console.log('store stateee')}
      {/* {store.getState() ? */}
      {loggedIn ? 
        <Router >
          {console.log('taking to home page...')}
          <div className='home-class'>
            {/* <Link to='/app'>Login/ Register</Link>
            <div className='div-main-class'>
              <Link className='link-class' to='/movieByGenre'>Movie By Genre</Link>
              <Link className='link-class' to='/movieSearch'>Movie Search</Link>
              <Link className='link-class' to='/movieByDirector'>Movie By Director</Link> */}
              {/* <Link className='link-class' to='/logout'>Logout</Link> */}
              {/* <button onClick={logoutFunction}>Logout</button>
            </div>
            <Route path='/app' component={App}></Route>
            <Route path='/movieByGenre' component={MovieGenreFilter}></Route>
            <Route path='/movieSearch' component={MovieSearch}></Route>
            <Route path='/movieByDirector' component={Directors}></Route>
            <Route path='/movieByActor' component={Actors}></Route> */}
            {/* <Route path='/logout' component={Logout}></Route> */}
            <Home />
          </div>
          {/* <App />
        <MovieGenreFilter />
        <MovieSearch />
        <Directors /> */}
        </Router> :
        <div className='main-container-class'>
          {/* u need to authorize */}
          <h1 className='main-header-class'>Movies App</h1>
          {console.log('taking to login page ...')}
          <App />
        </div>}
    </div>
  )
}

export default AppMain