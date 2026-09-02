import axios from 'axios';

let accessToken = null;

export const setAccessToken = (token) => {
    accessToken = token;
}

export const getAccessToken = () => accessToken;

let onAuthFailure = null;

export const setAuthFailureHandler = (handler) => {
    onAuthFailure = handler;
};



const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true
});

const refreshApi = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true
})

api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/")
        ) {
            originalRequest._retry = true;

            try {
                const response = await refreshApi.post("/auth/refresh");

                setAccessToken(response.data.accessToken);

                return api(originalRequest);
            } catch (refreshError) {
                setAccessToken(null);

                if (onAuthFailure) {
                    onAuthFailure();
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;