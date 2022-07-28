import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Switch, Link, Route , Routes} from 'react-router-dom';
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
import './home.scss'
import axios from 'axios';
import PopularMovies from './PopularMovies';

const Home = () => {
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
        window.location.reload(true)
    }
  return (
          <div className='div-main-class'>
            {/* <Link to='/app'>Login/ Register</Link> */}
            <div className='div-sub-class'> 
              <Link className='link-class' to='/movieByGenre'>Movie By Genre</Link>
              <Link className='link-class' to='/movieSearch'>Movie Search</Link>
              <Link className='link-class' to='/movieByDirector'>Movie By Director</Link>
              <Link className='link-class' to='/popular'>Popular Movies</Link>
              {/* <Link className='link-class' to='/logout'>Logout</Link> */}
              <button onClick={logoutFunction}>Logout</button>
            </div>
            <Route path='/app' component={App}></Route>
            <Route path='/movieByGenre' component={MovieGenreFilter}></Route>
            <Route path='/movieSearch' component={MovieSearch}></Route>
            <Route path='/movieByDirector' component={Directors}></Route>
            <Route path='/movieByActor' component={Actors}></Route>
            <Route path='/popular' component={PopularMovies}></Route>
            {/* <Route path='/logout' component={Logout}></Route> */}
          </div>
  )
}

export default Home