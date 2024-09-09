import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProfileInfo = createAsyncThunk(
    "profile/fetchProfileInfo",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("https://gamerize.ltd.ua/api/Account/profile");
            return response.data;
        } catch (error) {
            console.log(error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    })

const initialState = {
    profile: {
        id: 0,
        name: "",
        email: "",
        phoneNumber: null,
        city: "",
        deliveryAddress: "",
        profilePicture: null,
        isAdmin: false
    },
    isLoading: false
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProfileInfo.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchProfileInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
})

export const profileReducer = profileSlice.reducer;