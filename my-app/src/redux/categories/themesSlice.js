import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://gamerize.ltd.ua/";

export const fetchAllThemes = createAsyncThunk(
  "Theme/GetAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("api/Theme/GetAll");
      return response.data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const fetchThemeById = createAsyncThunk(
//   'Theme/fetchThemeById',
//   async (id) => {
//     try {
//       const response = await axios.get(`api/Theme/GetById/${id}`);
//       const data = response.data;
//       return data;
//     } catch (error) {
//       const err = error;
//       return err.message;
//     }
//   }
// );

// export const addTheme = createAsyncThunk(
//   "Theme/addTheme",
//   async (category, thunkAPI) => {
//     try {
//       const response = await axios.post("api/Theme/Create", category);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteTheme = createAsyncThunk(
//   "Theme/deleteTheme",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.delete(`api/Theme/Delete/${id}`);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const themesSlice = createSlice({
  name: "themes",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllThemes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllThemes.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchAllThemes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const themesReducer = themesSlice.reducer;
