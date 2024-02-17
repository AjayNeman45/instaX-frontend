// axiosInstance.js
import axios from "axios"

const instance = axios.create({
	baseURL: "http://localhost:3000/api",
	// baseURL: "https://instax.onrender.com/api",
	headers: {
		"Content-Type": "application/json",
		// You can add other common headers here if needed
	},
})

instance.interceptors.request.use(
	config => {
		// If the request is a FormData request, update the Content-Type header
		if (config.data instanceof FormData) {
			config.headers["Content-Type"] = "multipart/form-data"
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

export default instance
