import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://predictor.ltd.ua/";

export const fetchAllCategories = createAsyncThunk(
  "Category/GetAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("api/Category/GetAll");
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const fetchCategoryById = createAsyncThunk(
//   'Category/fetchCategoryById',
//   async (id) => {
//     try {
//       const response = await axios.get(`api/Category/GetById/${id}`);
//       const data = response.data;
//       return data;
//     } catch (error) {
//       const err = error;
//       return err.message;
//     }
//   }
// );

// export const addCategory = createAsyncThunk(
//   "Category/addCategory",
//   async (category, thunkAPI) => {
//     try {
//       const response = await axios.post("api/Category/Create", category);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteCategory = createAsyncThunk(
//   "Category/deleteCategory",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.delete(`api/Category/Delete/${id}`);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

// const handlePening = (state) => {
//   state.isLoading = true;
// };

// const handleRejected = (state, action) => {
//   console.log(action.payload);
//   state.isLoading = false;
//   state.error = action.payload;
// };

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    //   .addCase(addCategory.pending, (state) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(addCategory.fulfilled, (state, action) => {
    //     state.categories.push(action.payload);
    //     state.isLoading = false;
    //     state.error = null;
    //   })
    //   .addCase(addCategory.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //   });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
