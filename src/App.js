import { useState } from "react"
import AddRating from "./AddRating"
import LoginLogout from "./LoginLogout"
import Profile from "./Profile"
import ProtectedRoute from "./ProtectedRoute"
import store from "./redux-components/store"

const App = ({ isAuthenticated }) => {
	const [isAuth, setIsAuth] = useState(false)
	// if (isAuthenticated) {
	// 	console.log(isAuthenticated + ' is true');
	// 	setIsAuth(true)
	// }
	return (
		<div>
			<LoginLogout />
			<AddRating />
       {/* {(store.getState() != null && store.getState().authStatus) && <AddRating />}
	   {console.log('log check')}
	   {console.log(store.getState() != null && store.getState().authStatus)}
	   {console.log('log check')} */}
		</div>
	)
}
export default App