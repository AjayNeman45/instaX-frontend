import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/home.jsx';
import AuthContextProvider, { useAuthContext } from './context/authContext.jsx';
import Login from './pages/login.jsx';
import Profile from './pages/profile.jsx';
import Connections from './pages/connections.jsx';
import Register from './pages/register.jsx';

const ProtectedRoute = ({ children }) => {
	// const { user, isAuthenticated } = useAuthContext();
	let location = useLocation();
	const sessionUser = sessionStorage.getItem("user")
	if (!sessionUser) {
		return <Navigate to="/login" state={{ from: location }} replace />
	}
	return children
};

const LoginRoute = ({ children }) => {
	const { user, isAuthenticated } = useAuthContext();
	if (isAuthenticated && user) {
		return <Navigate to="/" />
	}
	return children
}


function App() {
	return (
		<>
			<Router>
				<AuthContextProvider>
					<Routes>
						<Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
						<Route path="/:username" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
						<Route path="/:username/:action" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
						<Route path="/followers" element={<ProtectedRoute><Connections /></ProtectedRoute>} />
						<Route path="/followings" element={<ProtectedRoute><Connections /></ProtectedRoute>} />
						<Route path="/login" element={<LoginRoute><Login /></LoginRoute>} />
						<Route path="/register" element={<LoginRoute><Register /></LoginRoute>} />
					</Routes>
				</AuthContextProvider>
			</Router>
		</>
	)
}

export default App
