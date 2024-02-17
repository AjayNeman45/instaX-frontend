import React, { Suspense } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import AuthContextProvider, { useAuthContext } from './context/authContext.jsx';
import MainLoader from "./utils/mainLoader.jsx";
import Messages from "./pages/message/messages.jsx";

const Home = React.lazy(() => import('./pages/home.jsx'))
const Login = React.lazy(() => import("./pages/login.jsx"))
const Profile = React.lazy(() => import("./pages/profile.jsx"))
const Connections = React.lazy(() => import("./pages/connections.jsx"))
const Register = React.lazy(() => import("./pages/register.jsx"))


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
				<Suspense fallback={<MainLoader />}>
					<AuthContextProvider>
						<Routes>
							<Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
							<Route path="/followers" element={<ProtectedRoute><Connections /></ProtectedRoute>} />
							<Route path="/followings" element={<ProtectedRoute><Connections /></ProtectedRoute>} />
							<Route path="/login" element={<LoginRoute><Login /></LoginRoute>} />
							<Route path="/register" element={<LoginRoute><Register /></LoginRoute>} />
							<Route path="/:username" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
							<Route path="/:username/:action" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
							<Route path="/messages" element={<Messages />} />
						</Routes>
					</AuthContextProvider>
				</Suspense>
			</Router>
		</>
	)
}

export default App
