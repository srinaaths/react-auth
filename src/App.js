import { useState } from "react"
import LoginLogout from "./LoginLogout"
import Profile from "./Profile"
import ProtectedRoute from "./ProtectedRoute"

const App = ({ isAuthenticated }) => {
	const [isAuth, setIsAuth] = useState(false)
	// if (isAuthenticated) {
	// 	console.log(isAuthenticated + ' is true');
	// 	setIsAuth(true)
	// }
	return (
		<div>
			<LoginLogout />
		</div>
	)
}
export default App