import axios from "axios"

const urlBackend = import.meta.env.VITE_URL_BACKEND as string
export const axiosInstance = axios.create({
    baseURL: urlBackend,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})