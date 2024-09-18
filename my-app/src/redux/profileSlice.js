import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import Axios from "axios";

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

export const updateProfileInfo = createAsyncThunk(
    "profile/updateProfileInfo",
    async (data, thunkAPI) => {
        try{
            await axios.patch("https://gamerize.ltd.ua/api/Account/update-profile", data);
            return data.name;
        }catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const deleteUserPhoto = createAsyncThunk(
    "profile/deleteUserPhoto",
    async (_, thunkAPI) => {
        try{
            await axios.delete('https://gamerize.ltd.ua/api/Account/delete-photo')
        }catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const setUserPhoto = createAsyncThunk(
    "profile/setUserPhoto",
    async (photoFile, thunkAPI) => {
        try{
            const formData = new FormData();
            formData.append('file', photoFile);
            if (formData.has('file')){
                await axios.post('https://gamerize.ltd.ua/api/Account/profile/picture', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
            }
        }catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


const initialState = {
    profile: {
        id: 0,
        name: "",
        email: "",
        phoneNumber: "",
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
            .addCase(fetchProfileInfo.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(updateProfileInfo.fulfilled, (state, action) => {
                state.profile.name = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(deleteUserPhoto.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(setUserPhoto.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
            })
            .addMatcher(
            (action) => action.type.endsWith('/pending'),
            (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    },
})

export const profileReducer = profileSlice.reducer;