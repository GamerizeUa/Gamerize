import axios from 'axios';
import {
    createSlice,
    createAsyncThunk,
    isPending,
    isFulfilled,
    isRejected,
} from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://gamerize.ltd.ua/';

const initialState = {
    statusOfPopular: 'loading',
    statusOfWithDiscount: 'loading',
    statusOfProduct: 'loading',
    product: null,
    productRating: null,
    popularProducts: [],
    productsWithDiscount: [],
};

export const getPopularAsync = createAsyncThunk(
    'products/getPopularAsync',
    async (count) => {
        const response = await axios.get(`/api/Product/GetPopularProducts`, {
            params: { count },
        });
        return { products: response.data };
    }
);

export const getProductById = createAsyncThunk(
    'products/getProductById',
    async (id) => {
        const response = await axios.get(`/api/Product/GetById/${id}`);
        return {
            product: response.data.product,
            averageRating: response.data.averageRating,
        };
    }
);

export const addFeedback = createAsyncThunk(
    'products/addFeedback',
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

export const getRandomProduct = createAsyncThunk(
    'products/getRandomProduct',
    async (filters) => {
        const response = await axios.post(
            `/api/Product/GetRandomProduct`,
            filters
        );
        return {
            product: response.data.product,
            averageRating: response.data.averageRating,
        };
    }
);

export const getWithDiscountAsync = createAsyncThunk(
    'products/getWithDiscountAsync',
    async (count) => {
        const response = await axios.get(
            `/api/Product/GetProductsWithBiggestDiscount`,
            { params: { count } }
        );
        return response.data.map(({ product, newPrice }) => {
            product.newPrice = newPrice;
            return product;
        });
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProductStatus: (state, action) => {
            state.statusOfProduct = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPopularAsync.fulfilled, (state, action) => {
                state.popularProducts = action.payload.products;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.product = action.payload.product;
                state.productRating = action.payload.averageRating;
            })
            .addCase(addFeedback.fulfilled, (state, action) => {
                state.product.feedbacks.push(action.payload);
            })
            .addCase(getRandomProduct.fulfilled, (state, action) => {
                state.product = action.payload.product;
                state.productRating = action.payload.averageRating;
            })
            .addCase(getWithDiscountAsync.fulfilled, (state, action) => {
                state.productsWithDiscount = action.payload;
            })
            .addMatcher(
                isPending(
                    getPopularAsync,
                    getProductById,
                    addFeedback,
                    getRandomProduct,
                    getWithDiscountAsync
                ),
                (state) => {
                    state.statusOfProduct = 'loading';
                }
            )
            .addMatcher(
                isFulfilled(
                    getPopularAsync,
                    getProductById,
                    addFeedback,
                    getRandomProduct,
                    getWithDiscountAsync
                ),
                (state) => {
                    state.statusOfProduct = 'fulfilled';
                }
            )
            .addMatcher(
                isRejected(
                    getPopularAsync,
                    getProductById,
                    addFeedback,
                    getRandomProduct,
                    getWithDiscountAsync
                ),
                (state) => {
                    state.statusOfProduct = 'failed';
                }
            );
    },
});

export const { setProductStatus } = productsSlice.actions;
export const carouselProductsReducer = productsSlice.reducer;

export const selectPopularProducts = (state) => state.products.popularProducts;
export const selectProductsWithDiscount = (state) =>
    state.products.productsWithDiscount;
export const selectProductStatus = (state) => state.products.statusOfProduct;
