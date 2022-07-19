import { useState } from "react"
import axios from 'axios'

const App = () => {
	const [usernameReg, setUsernameReg] = useState('')
	const [username, setUsername] = useState('')
	const [passwordReg, setPasswordReg] = useState('')
	const [password, setPassword] = useState('')
	const [loginStatus, setLoginStatus] = useState(false)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

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
	const userCheck = async(e) => {
		e.preventDefault();
		const user = {
			name: username,
			password: password
		}
		try {
			const res = await axios.post('http://localhost:8080/loginuser', user)
			console.log(res);
			console.log(res.data.auth)
			if(!res.data.auth)
				setLoginStatus(false)
			else {
				setLoginStatus(true)
				localStorage.setItem('token', res.data.token)
			}
		} catch (error) {
			console.log(error);
		}
	}
	const userAuthenticated = async() => {
		const res = await axios.get('http://localhost:8080/isuserauth'
		, 
		{
			headers: {
				'x-access-token': localStorage.getItem('token'),
			}
		}
		)
		console.log(res);
		if(res.data.isAuthenticated) {
			setIsAuthenticated(true)
		}
	}
	return (
		<div>
			<h2> Registration</h2>
			<form action="" onSubmit={(e) => submitFunction(e)}>
				<label htmlFor="">Name</label>
				<input type="text" onChange={usernameRegUpdate} /> <br /> <br />
				<label htmlFor="">Password</label>
				<input type="password" onChange={passwordRegUpdate} /> <br /> <br />
				<input type="submit" />
			</form>
			<h2> Login</h2>
			<form action="" onSubmit={(e) => userCheck(e)}>
				<label htmlFor="">Name</label>
				<input type="text" onChange={usernameUpdate} /> <br /> <br />
				<label htmlFor="">Password</label>
				<input type="password" onChange={passwordUpdate} /> <br /> <br />
				<input type="submit" />
			</form>
			{/* <h1>{loginStatus && <div>lol</div>}</h1> */}
			<h2>{loginStatus && (
				<button onClick={userAuthenticated}>Check if authenticated</button>
			)}</h2>
			<h2>{isAuthenticated && (
				<a href='www.google.com'>add movie</a>
			)}</h2>
		</div>
	)
}

export default App