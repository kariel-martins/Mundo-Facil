import axios from "axios"
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5050/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})