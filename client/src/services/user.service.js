import api from "../config/api.config.js";

export const getProfile = async () =>{
    console.log('getProfile called');
    const response = await api.get('/users/profile');

    return response.data;
}