import { useState } from "react"
import axios from 'axios'
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from "react-router-dom"
import Auth from "./Auth"
import App from "./App"
import AuthPage from "./AuthPage"
import store from "./redux-components/store"
import MoviesRatingPage from "./MoviesRatingPage"
import './loginLogout.scss'
import AppMain from "./AppMain"
import Registration from "./Registration"
import Login from "./Login"
import Home from "./Home"

const LoginLogout = () => {

    const [usernameReg, setUsernameReg] = useState('')
    const [username, setUsername] = useState('')
    const [passwordReg, setPasswordReg] = useState('')
    const [password, setPassword] = useState('')
    const [loginStatus, setLoginStatus] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    let userIdentity = null;

    const usernameRegUpdate = (event) => {
        setUsernameReg(event.target.value)
    }
    const passwordRegUpdate = (event) => {
        setPasswordReg(event.target.value)
    }
    const usernameUpdate = (event) => {
        setUsername(event.target.value)
    }
    const passwordUpdate = (event) => {
        setPassword(event.target.value)
    }
    const submitFunction = async (e) => {
        e.preventDefault();
        console.log('called');
        const user = {
            name: usernameReg,
            password: passwordReg
        }
        try {
            const res = await axios.post('http://localhost:8080/adduser', user);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    const userCheck = async (e) => {
        e.preventDefault();
        const user = {
            name: username,
            password: password
        }
        try {
            const res = await axios.post('http://localhost:8080/loginuser', user)
            console.log(res);
            console.log(res.data.auth)
            if (!res.data.auth) {
                setLoginStatus(false)
                setIsAuthenticated(false)
                store.dispatch({ type: 'USER_LOGOUT' })
            }
            else {
                setLoginStatus(true)
                localStorage.setItem('token', res.data.token)
                userAuthenticated();
            }
        } catch (error) {
            console.log(error);
        }
    }
    const logoutFunction = async () => {
        console.log('called');
        store.dispatch({ type: 'USER_LOGOUT' })
        console.log(store.getState());
        setIsAuthenticated(false)
    }
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
        if (res.data.isAuthenticated) {
            userIdentity = res.data.userId
            setIsAuthenticated(true)
            store.dispatch({
                type: 'USER_LOGIN',
                payload: {
                    id: res.data.userId,
                    token: localStorage.getItem('token'),
                    authStatus: true
                }
            })
            console.log(store.getState());
        }
        else {
            console.log('auth set to false');
            setIsAuthenticated(false)
            store.dispatch({ type: 'USER_LOGOUT' })
        }
    }
    return (
        <div className="main-container-class">
            <a href="localhost:3001"><img src="data:image/jpeg;base64,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" alt="" /></a>
            <h1 className="main-header">Welcome to the Filmovies</h1>
            <h2 className="sub-header">Login/ Register to continue</h2>
            <Router>
                <Link className="link-class" to='/register'>Register</Link>
                <Link className="link-class" to='/login'>Login</Link>
                <Route path='/register' component={Registration}></Route>
                <Route path='/login' component={Login}></Route>
                {/* {console.log(isAuthenticated)}
                {console.log(store.getState())}
                <Route exact path='/movieslist' component={MoviesRatingPage}></Route>
                {isAuthenticated && <Redirect to='/movieslist' />}
                <div>{isAuthenticated && <AuthPage isAuthenticated />}</div>
                <div>{isAuthenticated && <button onClick={logoutFunction}>Logout</button>}</div> */}
                <div>{store.getState() && 
                    <Router>
                        {console.log('hitting')}
                        <Route path='/home' component={Home}></Route>
                        <Link to='/home'>Go to home page</Link>
                    </Router>
                }</div>
            </Router>
        </div>
    )
}

export default LoginLogout