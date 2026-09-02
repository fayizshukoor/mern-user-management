import api from "../config/api.config.js";

export const getUsers = async (search = "") =>{
    const response = await api.get('/admin/users',{
        params: {
            search
        }
    });
    return response.data;
}
