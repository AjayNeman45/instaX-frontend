// axiosInstance.js
import axios from "axios"

const instance = axios.create({
	baseURL: "http://localhost:3000/api", // Replace with your base URL
	timeout: 10000, // Optional: Set a timeout for requests in milliseconds
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
