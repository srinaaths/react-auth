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