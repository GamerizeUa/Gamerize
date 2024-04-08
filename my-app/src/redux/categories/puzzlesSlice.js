import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://gamerize.ltd.ua/";

export const fetchAllPuzzles = createAsyncThunk(
  "Puzzle/GetAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("api/Puzzle/GetAll");
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

const puzzlesSlice = createSlice({
  name: "puzzles",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPuzzles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllPuzzles.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchAllPuzzles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const puzzlesReducer = puzzlesSlice.reducer;
