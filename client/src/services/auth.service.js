import api from "../config/api.config.js"

export const register = async (userData)=>{
        const response = await api.post('/auth/register', userData);
        return response.data;
}

export const login = async (credentials)=>{
        const response = await api.post('/auth/login', credentials);
        return response.data;
}

export const refresh = async () =>{
        const response = await api.post('/auth/refresh');
        return response.data;
}

export const logout = async () => {
        const response = await api.post("/auth/logout");
    
        return response.data;
    };