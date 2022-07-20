import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom"

function ProtectedRoute({ isAuth: isAuth, component: Component, ...rest }) {
    return (
        <Router>
            <Route {...rest} render={(props) => {
                console.log(isAuth);
                console.log(Component);
                if (isAuth) {
                    console.log('in');
                    return <Component />
                }
                else {
                    return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                }
            }} />
        </Router>
    )
}

export default ProtectedRoute