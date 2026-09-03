import api from "../config/api.config.js";

export const getProfile = async () =>{
    const response = await api.get("/users/profile");
    return response.data;
};


export const updateProfile = async (userData) => {
    const response = await api.put("/users/profile", userData);
    return response.data;
};

export const uploadProfileImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    const response = await api.put("/users/profile/image", formData);

    return response.data;
};

export const removeProfileImage = async () => {
    const response = await api.delete("/users/profile/image");

    return response.data;
};