import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom"
import Profile from './Profile';

function ProtectedRoute({ isAuth: isAuth, component: Component, ...rest }) {
    return (
        <Router>
            {console.log('in function')}
            <Route {...rest} render={(props) => {
                {console.log('in route')}

                if (isAuth) {
                    console.log('in');
                    return <Component />
                }
                else {
                    console.log('in else');
                    return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                }
            }} />
        </Router>
    )
}

export default ProtectedRoute