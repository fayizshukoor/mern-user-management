import api from "../config/api.config.js";

export const getUsers = async (
    search = "",
    page = 1,
    limit = 10
) => {
    const response = await api.get("/admin/users", {
        params: {
            search,
            page,
            limit
        }
    });

    return response.data;
};

export const createUser = async (userData) => {
    const response = await api.post("/admin/users", userData);

    return response.data;
};

export const updateUser = async (userId, userData) => {
    const response = await api.put(`/admin/users/${userId}`, userData);

    return response.data;
};

export const deleteUser = async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);

    return response.data;
};