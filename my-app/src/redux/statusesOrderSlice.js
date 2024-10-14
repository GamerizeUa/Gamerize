import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStatuses = createAsyncThunk(
    "orders/fetchStatuses",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("https://gamerize.ltd.ua/api/Status/GetAll");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

const initialState = {
    statusesOrder: []
}

const statusesOrderSlice = createSlice({
    name: "statusesOrder",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchStatuses.fulfilled, (state, action) => {
                state.statusesOrder = [
                {
                    id: 0,
                    status: 'Всі замовлення'
                }, ...action.payload];
            })
    }
})

export const statusesOrderReducer = statusesOrderSlice.reducer;