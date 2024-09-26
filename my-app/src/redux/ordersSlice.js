import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axios from "axios";

export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const page = state.orders.currentPage;
            const response = await axios.get("https://gamerize.ltd.ua/api/Order/GetAll",
                {params: {page}});
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const fetchOrdersByStatus = createAsyncThunk(
    "orders/fetchOrdersByStatus",
    async (statusId, thunkAPI) => {
        try {
            const response = await axios.get("https://gamerize.ltd.ua/api/Order/GetByStatusAllOrders",
                {params: {statusId}});
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

const initialState = {
    orders: [],
    totalOrders: null,
    totalPages: null,
    currentPage: 1,
    loading: false,
    error: null,
    statusId: 0
}

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
                state.totalOrders = action.payload.totalOrders;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.page;
            })
            .addCase(fetchOrdersByStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
                state.totalOrders = action.payload.totalOrders;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.page;
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    }
})

export const { setCurrentPage} = ordersSlice.actions;

export default ordersSlice.reducer;