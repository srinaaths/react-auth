import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Profile from "./Profile"
import ProtectedPath from './ProtectedPath';
import ProtectedRoute from "./ProtectedRoute"

function AuthPage({ isAuthenticated }) {
    const [isAuth, setIsAuth] = useState(isAuthenticated);
    // if(isAuthenticated)
    //     setIsAuth(true)
    const logoutFunction = () => {
        setIsAuth(false)
    }
    const loginFunction = () => {
        setIsAuth(true)
    }
    return (
            // <Router>
            //     <Route>
            //         <button onClick={logoutFunction}>Logout</button>
            //         <button onClick={loginFunction}>Login</button>
            //         <Link to='/profile'>go to profile</Link>
            //     </Route>
            // <ProtectedRoute path='/profile' component={Profile} isAuth={isAuth} />
            // </Router>
            <ProtectedPath />
    )
}

export default AuthPage