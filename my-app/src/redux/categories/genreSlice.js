import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://gamerize.ltd.ua/";

export const fetchAllGenres = createAsyncThunk(
  "Genre/GetAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("api/Genre/GetAll");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const fetchCategoryById = createAsyncThunk(
//   'Genre/fetchGenreById',
//   async (id) => {
//     try {
//       const response = await axios.get(`api/Genre/GetById/${id}`);
//       const data = response.data;
//       return data;
//     } catch (error) {
//       const err = error;
//       return err.message;
//     }
//   }
// );

// export const addGenre = createAsyncThunk(
//   "Genre/addGenre",
//   async (category, thunkAPI) => {
//     try {
//       const response = await axios.post("api/Genre/Create", category);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteGenre = createAsyncThunk(
//   "Genre/deleteGenre",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.delete(`api/Genre/Delete/${id}`);
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

const genresSlice = createSlice({
  name: "genres",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllGenres.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllGenres.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchAllGenres.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const genresReducer = genresSlice.reducer;
