import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://gamerize.ltd.ua/";

export const fetchAllLanguages= createAsyncThunk(
    "Language/GetAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("api/Language/GetAll");
            return response.data;
        } catch (error) {
            console.log(error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    items: [],
    isLoading: false,
    error: null,
};

const languagesSlice = createSlice({
    name: "languages",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllLanguages.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllLanguages.fulfilled, (state, action) => {
                state.items = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchAllLanguages.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const languagesReducer = languagesSlice.reducer;