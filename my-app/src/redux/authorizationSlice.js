import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
            const response = await axios.get('https://gamerize.ltd.ua/api/Login/check', {
                withCredentials: true
            });
            console.log(response)
            if (response.status === 200) {
                return true;}
             else {
                return false;
            }
    }
);

const initialState = {
    isAuthenticated: false,
    loading: false,
    error: null,
};

export const authorizationSlice = createSlice({
    name : "authorization",
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isAuthenticated = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const { logout } = authorizationSlice.actions;
export default authorizationSlice.reducer;

