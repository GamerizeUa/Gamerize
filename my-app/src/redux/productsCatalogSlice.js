import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
    'productsCatalog/fetchProducts',
    async ({ page, pageSize, filters }, { rejectWithValue }) => {
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

export const deleteProduct = createAsyncThunk(
    'productsCatalog/delete',
    async ({ productID }, { rejectWithValue }) => {
        try {
            await axios.delete(
                `https://gamerize.ltd.ua/api/Product/Delete/${productID}`
            );

            return productID;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addProduct = createAsyncThunk(
    'productsCatalog/add',
    async ({ product }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `https://gamerize.ltd.ua/api/Product/Create/`,
                product,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const editProduct = createAsyncThunk(
    'productsCatalog/edit',
    async ({ id, product }, { rejectWithValue }) => {
        try {
            const res = await axios.put(
                `https://gamerize.ltd.ua/api/Product/Update/${id}`,
                product,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const searchProduct = createAsyncThunk(
    'productsCatalog/search',
    async ({ searchTerm, page, pageSize }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `https://gamerize.ltd.ua/api/Product/SearchProduct`,
                { searchTerm },
                {
                    params: { page, pageSize },
                }
            );

            return res.data;
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
        categories: [],
        genres: [],
        languages: [],
        mindGames: [],
        puzzles: [],
        themes: [],
        ages: [],
        playersAmount: [],
        price: [],
        gameTime: [],
        sortOrder: '',
        searchTerm: '',
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
                sortOrder: state.filters.sortOrder,
                searchTerm: state.filters.searchTerm,
            };
        },
        setSortOrder: (state, action) => {
            state.filters.sortOrder = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.filters.searchTerm = action.payload;
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
        },
    },
    extraReducers: (builder) => {
        builder

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
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(
                    (product) => product.id !== action.payload
                );
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex(
                    ({ id }) => id === action.payload.id
                );
                if (index !== -1) state.products[index] = action.payload;
            })
            .addCase(searchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.totalPages = action.payload.totalPages;
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    },
});

export const {
    setPage,
    setFilters,
    setSortOrder,
    setPageSize,
    setSearchTerm,
    resetFilters,
} = productsCatalogSlice.actions;
export default productsCatalogSlice.reducer;
