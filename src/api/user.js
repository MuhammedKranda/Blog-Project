import axios from "axios";
import { setCookie, deleteCookie, getCookies } from "../helpers/helpers";

const baseURL = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add response interceptor for CORS errors
baseURL.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === 'Network Error') {
      console.error('CORS Error: Make sure the backend server is running and CORS is properly configured');
    }
    return Promise.reject(error);
  }
);

export const register = async (data) => {
    try {
        const userData = {
            username: data.username,
            email: data.email,
            password: data.password,
            name: data.name,
            surname: data.surname,
        };
        const response = await baseURL.post("/api/users/register", userData);
        
        // Check if response exists and has the expected structure
        if (!response || !response.data) {
            throw new Error('Invalid response from server');
        }

        // Check for successful creation
        if (response.status === 201) {
            // Check if token exists in response
            if (response.data.token) {
                setCookie('authToken', response.data.token, { expires: 7, secure: true });
                return response.data;
            } else {
                console.warn('Registration successful but no token received');
                return response.data;
            }
        }
        
        throw new Error('Registration failed: ' + (response.data.message || 'Unknown error'));
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            throw new Error(error.response.data.message || 'Registration failed');
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw error;
        }
    }
};

export const login = async (data) => {
    try {
        const userLogin = {
            email: data.email,
            username: data.username,
            password: data.password,
        }
        const response = await baseURL.post("/api/users/login", userLogin);
        if (response.status === 200 && response.data.token) {
            setCookie('authToken', response.data.token, { expires: 7, secure: true });
            return response.data;
        }
        throw new Error('Login failed');
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await baseURL.post("/api/users/logout");
        if (response.status === 200) {
            deleteCookie('authToken');
            return response.data;
        }
        throw new Error('Logout failed');
    } catch (error) {
        throw error;
    }
};

export const isAuthenticated = () => {
    return !!getCookies('authToken');
};

export default baseURL;