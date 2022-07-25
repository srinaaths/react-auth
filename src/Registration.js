import axios from 'axios'
import React, { useState } from 'react'
import './registration.scss'

const Registration = () => {
    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')
    const usernameRegUpdate = (event) => {
        setUsernameReg(event.target.value)
    }
    const passwordRegUpdate = (event) => {
        setPasswordReg(event.target.value)
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
    return (
        <div>
            <form action="" className="reg-form-class" onSubmit={(e) => submitFunction(e)}>
                <h2> Registration</h2>
                <div className="user-input-class">
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder='name' onChange={usernameRegUpdate} /> <br /> <br />
                </div>
                <div className="user-input-class">
                    <label htmlFor="">Password</label>
                    <input type="password" placeholder='password' onChange={passwordRegUpdate} /> <br /> <br />
                </div>
                <input class='submit-button' type="submit" value="Register" />
            </form>
        </div>
    )

}

export default Registration