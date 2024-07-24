import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
    'productsCatalog/fetchProducts',
    async ({ page, pageSize, filters}, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'https://gamerize.ltd.ua/api/Product/GetSimpleList',
                filters,
                {
                    params: { page, pageSize },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addFeedback = createAsyncThunk(
    'productsCatalog/addFeedback',
    async (feedback, { rejectWithValue }) => {
        try {
            await axios.post(
                'https://gamerize.ltd.ua/api/Feedback/Create',
                feedback
            );

            return feedback;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    products: [],
    totalPages: 0,
    loading: false,
    filters: {
        "categories": [],
        "genres": [],
        "languages": [],
        "mindGames": [],
        "puzzles": [],
        "themes": [],
        "ages": [],
        "playersAmount": [],
        "price": [],
        "gameTime": [],
        "sortOrder": "",
        "searchTerm": ""
    },
    page: 1,
    pageSize: 12,
};

export const productsCatalogSlice = createSlice({
    name: 'productsCatalog',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = {
                ...state.filters,
                ...action.payload,
                sortOrder: state.filters.sortOrder
            };
        },
        setSortOrder: (state, action) => {
            state.filters.sortOrder = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFeedback.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(addFeedback.fulfilled, (state, action) => {
                state.loading = false;
                const productToUpdate = state.products.find(
                    (product) => product.id == action.payload.productId
                );
                productToUpdate.feedbacks.push(action.payload);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addFeedback.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setPage, setFilters, setSortOrder } = productsCatalogSlice.actions;
export default productsCatalogSlice.reducer;
