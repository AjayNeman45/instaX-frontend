import React, { createContext, useContext, useEffect, useState } from "react"

import axios from "../config/axios.config"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export const useAuthContext = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState()
	const navigate = useNavigate();
	const login = async (formData) => {
		return new Promise(async (resolve, reject) => {
			try {
				const { data: loginRes } = await axios.post("/auth/login", formData);
				if (loginRes.success) {
					setIsAuthenticated(true);
					setUser(loginRes.data.response[0])
					sessionStorage.setItem('user', JSON.stringify(loginRes.data.response[0]));
					navigate("/")
					resolve()
				} else {
					console.log()
					reject(loginRes.data.error)
				}
			} catch (error) {
				reject(error?.response?.data?.data?.error)
			}
		})
	};

	const register = async (formData) => {
		return new Promise(async (resolve, reject) => {
			try {
				const { data: signUpRes } = await axios.post("/auth/register", formData)
				if (signUpRes.success) {
					setIsAuthenticated(true);
					setUser(signUpRes.data.response[0])
					sessionStorage.setItem('user', JSON.stringify(signUpRes.data.response[0]));
					navigate("/")
				}
				return resolve()
			} catch (error) {
				console.log(error)
				reject(error?.response?.data?.data?.error)
			}
		})
	}

	const logout = () => {
		setIsAuthenticated(false);
	};

	useEffect(() => {
		const user = sessionStorage.getItem("user")
		if (user) {
			setUser(JSON.parse(user))
			setIsAuthenticated(true)
		}
	}, [])
	// let user = {
	// 	"_id": "65abe8c66eab8fcca19ec83c",
	// 	"username": "rohit sharma",
	// 	"email": "rohit@sharma.com",
	// 	"password": "123",
	// 	"name": "Rohhit Sharma",
	// 	"description": "descc",
	// 	"profilePhoto": "https://cdn.britannica.com/52/252752-050-2E120356/Cricketer-Rohit-Sharma-2023.jpg",
	// 	"__v": 0
	// }

	const value = {
		user,
		setUser,
		login,
		logout,
		isAuthenticated,
		setIsAuthenticated,
		register
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
