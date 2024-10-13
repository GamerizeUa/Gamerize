import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://gamerize.ltd.ua/';

const initialState = {
    orders: [],
    totalOrders: 0,
    page: 1,
    totalPages: 1,
    isLoading: false,
    error: null,
};

export const fetchOrdersByUserId = createAsyncThunk(
    'Order/GetByUserId/',
    async ({ id, page = 1, totalOrder = 10 }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`api/Order/GetByUserId/${id}`, {
                params: { page, totalOrder },
            });
            return response.data;
        } catch ({ response }) {
            return rejectWithValue(response.data);
        }
    }
);

const orderHistorySlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        changePage: (state, action) => {
            state.page = action.payload || 1;
        },
    },
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
                state.totalPages = action.payload.totalPages;
                state.totalOrders = action.payload.totalOrders;
                state.page = action.payload.page;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchOrdersByUserId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { changePage } = orderHistorySlice.actions;
export const orderHistoryReducer = orderHistorySlice.reducer;
