import axios from 'axios';
import { error } from 'console';

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
    // withCredentials: true
})

axiosClient.interceptors.request.use(
    (config) => {
        const token = typeof window !== undefined ? localStorage.getItem('token') : null;
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401 || error.response?.status === 403){
            console.warn('redircting to login page');
            if( typeof window !== 'undefined'){
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
)