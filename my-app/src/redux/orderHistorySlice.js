import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://gamerize.ltd.ua/';

const initialState = {
    orders: [],
    isLoading: false,
    error: null,
};

export const fetchOrdersByUserId = createAsyncThunk(
    'Order/GetByUserId/',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`api/Order/GetByUserId/${id}`);
            return response.data;
        } catch ({ response }) {
            return rejectWithValue(response.data);
        }
    }
);

const orderHistorySlice = createSlice({
    name: 'orders',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrdersByUserId.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
                state.orders = action.payload.orders
                    ? action.payload.orders
                    : [];
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchOrdersByUserId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const orderHistoryReducer = orderHistorySlice.reducer;
