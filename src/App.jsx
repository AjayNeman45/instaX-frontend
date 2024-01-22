import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/home.jsx';
import AuthContextProvider, { useAuthContext } from './context/authContext.jsx';
import Login from './pages/login.jsx';


const ProtectedRoute = ({ children }) => {
	const { user, isAuthenticated } = useAuthContext();
	let location = useLocation();

	if (!isAuthenticated || !user) {
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
						<Route path="/login" element={<LoginRoute><Login /></LoginRoute>} />
					</Routes>
				</AuthContextProvider>
			</Router>
		</>
	)
}

export default App
