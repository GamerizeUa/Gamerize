import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";

export const fetchProducts = createAsyncThunk(
    'productsCatalog/fetchProducts',
    async ({page, pageSize}, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://gamerize.ltd.ua/api/Product/GetSimpleList', {},{
                params: { page, pageSize},
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    products: [],
    totalPages: 0,
    loading: false,
    filters: {},
    page: 1,
    pageSize: 12,
}

export const productsCatalogSlice = createSlice({
    name: "productsCatalog",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.totalPages = action.payload.totalPages
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {setPage, setFilters} = productsCatalogSlice.actions;
export default productsCatalogSlice.reducer;