import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, adminLogin, refresh, register } from '../../services/auth.service.js';
import { setAccessToken } from '../../config/api.config.js';
import { getProfile } from '../../services/user.service.js';

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData) =>{
        const data = await register(userData);
        return data;
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials) =>{
        const data = await login(credentials);
        setAccessToken(data.accessToken);
        return data;
    }
)

export const adminLoginUser = createAsyncThunk(
    "auth/adminLoginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await adminLogin(credentials);

            setAccessToken(data.accessToken);

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Admin login failed"
            );
        }
    }
);

export const initializeAuth = createAsyncThunk(
    "auth/initializeAuth",
    async () => {
        const data = await refresh();

        setAccessToken(data.accessToken);

        const profile = await getProfile();

        return {
            accessToken: data.accessToken,
            user: {
                id: profile.userId,
                role: profile.role
            }
        };
    }
);

const authSlice = createSlice({
    name : 'auth',
    initialState: {
        user: null,
        accessToken: null,
        isAuthenticated: false,
        authInitialized: false,
        loading: false,
        error: null
    },
    reducers: {
        logout: (state) =>{
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(registerUser.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state)=>{
            state.loading = false;
        })
        .addCase(registerUser.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(loginUser.pending, (state) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) =>{
            state.loading = false;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
        })
        .addCase(loginUser.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(adminLoginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(adminLoginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
        })
        .addCase(adminLoginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(initializeAuth.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
            state.authInitialized = true;
        })
        .addCase(initializeAuth.rejected, (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.authInitialized = true;
        })
    }

})

export const { logout } = authSlice.actions;
export default authSlice.reducer;