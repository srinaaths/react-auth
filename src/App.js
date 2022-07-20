import { useState } from "react"
import LoginLogout from "./LoginLogout"
import Profile from "./Profile"
import ProtectedRoute from "./ProtectedRoute"

const App = ({isAuthenticated}) => {
	const [isAuth, setIsAuth] = useState(false)
	// if(isAuthenticated)
	// 	setIsAuth(true)
	return (
		<div>
			<LoginLogout />
				<ProtectedRoute path='/profile' component={Profile} isAuth= {isAuth}/>
		</div>
	)
}
export default App