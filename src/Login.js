import axios from 'axios'
import React, { useState } from 'react'
import { BrowserRouter as Router, Link, Route, Redirect, useHistory} from 'react-router-dom'
import AppMain from './AppMain'
import store from './redux-components/store'
import './Login.css'
import './login.scss'
import Home from './Home'

const Login = () => {
    let history = useHistory()
    const [redirect, setRedirect] = useState(false)
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
                localStorage.setItem('user', (res.data.result.id));
                console.log('res data is ');
                console.log(res.data);
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
            setRedirect(true)
        }
        else {
            console.log('auth set to false');
            setIsAuthenticated(false)
            store.dispatch({ type: 'USER_LOGOUT' })
        }
    }
    return (
        <div className='main-container-class'>
            {!isAuthenticated ?
                (<div>
                    <form action="" className="reg-form-class" onSubmit={(e) => userCheck(e)}>
                        <h2 > Login</h2>
                        <div className="user-input-class">
                            <label htmlFor="">Name</label>
                            <input type="text" onChange={usernameUpdate} /> <br /> <br />
                        </div>
                        <div className="user-input-class">
                            <label htmlFor="">Password</label>
                            <input type="password" onChange={passwordUpdate} /> <br /> <br />
                        </div>
                        <input class='submit-button' type="submit" value="Login" />
                    </form>
                </div>)
                :
                <div>{isAuthenticated &&
                    <div>
                        <Home />
                    </div>
                    // <Router>
                    //     {console.log('hitting')}
                    //     <Route path='/' component={Home}></Route>
                    //     <Link to='/'>Go to home page</Link>
                    // </Router>
                }</div>
            }
        </div>
    )
}

export default Login