import axios from "axios";
import { getCookies } from "../helpers/helpers";

const baseURL = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

// Request interceptor - her istekte çalışır
baseURL.interceptors.request.use(
    (config) => {
        // Token'ı cookie'den al
        const token = getCookies('user_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - her yanıtta çalışır
baseURL.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token geçersiz veya süresi dolmuş
            // Kullanıcıyı login sayfasına yönlendir
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export const getBlogs = async () => {
    const response = await baseURL.get("/api/blogs");
    return response.data;
};

export const getBlog = async () => { 
    const response = await baseURL.get(`/api/blogs/`);
    return response.data;
};

export const createBlog = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('slug', data.slug);
    formData.append('visibility', data.visibility);
    formData.append('category', data.category);
    formData.append('summary', data.summary);
    formData.append('image', data.mainImage);

    const response = await baseURL.post('/api/blogs/createBlog', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const editBlog = async (id, data) => {
    const response = await baseURL.patch(`/api/blogs/${id}`, data);
    return response.data;
}

export const updateBlog = async (id, data) => {
    const response = await baseURL.put(`/api/blogs/${id}`, data);
    return response.data;
};

export const deleteBlog = async (id) => {
    const response = await baseURL.delete(`/api/blogs/${id}`);
    return response.data;
};

export default baseURL;