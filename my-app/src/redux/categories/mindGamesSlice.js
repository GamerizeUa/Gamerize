import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://gamerize.ltd.ua/";

export const fetchAllMindGames = createAsyncThunk(
  "MindGames/GetAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("api/MindGames/GetAll");
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

const mindGamesSlice = createSlice({
  name: "mindGames",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMindGames.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllMindGames.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchAllMindGames.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const mindGamesReducer = mindGamesSlice.reducer;
