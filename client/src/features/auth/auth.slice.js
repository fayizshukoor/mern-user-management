import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, adminLogin, refresh, register } from '../../services/auth.service.js';
import { setAccessToken } from '../../config/api.config.js';
import { getProfile } from '../../services/user.service.js';

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const data = await register(userData);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await login(credentials);

            setAccessToken(data.accessToken);

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    }
);

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
                id: profile._id,
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
        },
        clearError: (state) => {
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
            state.error = action.payload;
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
            state.error = action.payload;
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
            state.error = action.payload;
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

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;