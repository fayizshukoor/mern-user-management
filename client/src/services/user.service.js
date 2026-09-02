import api from "../config/api.config.js";

export const getProfile = async () =>{
    const response = await api.get('/users/profile');
    return response.data;
};


