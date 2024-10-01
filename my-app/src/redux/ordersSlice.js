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
            const state = thunkAPI.getState();
            const page = state.orders.currentPage;
            const response = await axios.get("https://gamerize.ltd.ua/api/Order/GetByStatusAllOrders",
                {params: {statusId, page}});
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const fetchOrdersByFilter = createAsyncThunk(
    "orders/fetchOrdersByFilter",
    async (searchTerm = '', thunkAPI) => {
        try {
            const { orders: { statusId, startDate, endDate } } = thunkAPI.getState();

            const params = {
                ...(searchTerm && { searchTerm }),
                ...(statusId !== 0 && { statusId }),
                ...(startDate && { startDate }),
                ...(endDate && { endDate })
            };

            const response = await axios.get("https://gamerize.ltd.ua/api/Order/GetOrdersWithPagination",
                {params});
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const updateOrderStatus = createAsyncThunk(
    "orders/updateOrderStatus",
    async({orderId, newStatusId}, thunkAPI) => {
        try{
            await axios.put("https://gamerize.ltd.ua/api/Order/UpdateStatus", null,
                {params: {orderId, newStatusId}})
        }catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }

    }
)

const handleFulfilled = (state, action) => {
    state.loading = false;
    state.orders = action.payload.orders;
    state.totalOrders = action.payload.totalOrders;
    state.totalPages = action.payload.totalPages;
    state.currentPage = action.payload.page;
};

const initialState = {
    orders: [],
    totalOrders: null,
    totalPages: null,
    currentPage: 1,
    loading: false,
    error: null,
    statusId: 0,
    startDate: null,
    endDate: null,
}

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setStatusId: (state, action) => {
            state.statusId = action.payload;
        },
        setDates: (state, action) => {
            state.startDate = action.payload.startDate;
            state.endDate = action.payload.endDate;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.fulfilled, handleFulfilled)
            .addCase(fetchOrdersByStatus.fulfilled, handleFulfilled)
            .addCase(fetchOrdersByFilter.fulfilled, handleFulfilled)
            .addCase(updateOrderStatus.fulfilled, (state) => {
                state.loading = false;
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
                    state.orders = [];
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    }
})

export const { setCurrentPage, setStatusId, setDates} = ordersSlice.actions;

export default ordersSlice.reducer;