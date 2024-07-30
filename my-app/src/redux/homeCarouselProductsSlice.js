import axios from "axios";
import {createAppSlice} from "./createAppSlice";

axios.defaults.baseURL = "https://gamerize.ltd.ua/";

const initialState = {
    statusOfPopular: "loading",
    statusOfWithDiscount: "loading",
    statusOfProduct: "loading",
    product: null,
    productRating: null,
    popularProducts: [],
    productsWithDiscount: [],
};

const carouselProductsSlice = createAppSlice({
    name: "homeCarouselProducts",
    initialState,
    reducers: (create) => ({
        getPopularAsync: create.asyncThunk(
            async (count) => {
                const response = await axios.get(`/api/Product/GetPopularProducts`, {
                    params: {
                        count,
                    },
                });
                return {
                    products: response.data,
                };
            },
            {
                pending: (state) => {
                    state.statusOfPopular = "loading";
                },
                fulfilled: (state, action) => {
                    state.statusOfPopular = "fulfilled";
                    state.popularProducts = action.payload.products;
                },
                rejected: (state) => {
                    state.statusOfPopular = "failed";
                },
            }
        ),
        getProductById: create.asyncThunk(
            async (id) => {
                const response = await axios.get(`/api/Product/GetById/${id}`, {
                    // params: {
                    //     id,
                    // },
                });
                return {
                    product: response.data.product,
                    averageRating: response.data.averageRating,
                };
            },
            {
                pending: (state) => {
                    state.statusOfProduct = "loading";
                },
                fulfilled: (state, action) => {
                    state.statusOfProduct = "fulfilled";
                    state.product = action.payload.product;
                    state.productRating = action.payload.averageRating;
                },
                rejected: (state) => {
                    state.statusOfProduct = "failed";
                },
            }
        ),
        getRandomProduct: create.asyncThunk(
            async (filters) => {
                const response = await axios.post(`/api/Product/GetRandomProduct`, filters);
                return {
                    product: response.data.product,
                    averageRating: response.data.averageRating,
                };
            },
            {
                pending: (state) => {
                    state.statusOfProduct = "loading";
                },
                fulfilled: (state, action) => {
                    state.statusOfProduct = "fulfilled";
                    state.product = action.payload.product;
                    state.productRating = action.payload.averageRating;
                },
                rejected: (state) => {
                    state.statusOfProduct = "failed";
                },
            }
        ),
        setProductStatus: (state, action) => {
            state.statusOfProduct = action.payload;
        },
        getWithDiscountAsync: create.asyncThunk(
            async (count) => {
                const response = await axios.get(
                    `/api/Product/GetProductsWithBiggestDiscount`,
                    {
                        params: {
                            count,
                        },
                    }
                );
                return {
                    data: response.data,
                };
            },
            {
                pending: (state) => {
                    state.statusOfWithDiscount = "loading";
                },
                fulfilled: (state, action) => {
                    state.statusOfWithDiscount = "fulfilled";
                    state.productsWithDiscount = action.payload.data.map(
                        ({product, newPrice}) => {
                            product.newPrice = newPrice;
                            return product;
                        }
                    );
                },
                rejected: (state) => {
                    state.statusOfWithDiscount = "failed";
                },
            }
        ),
    }),
    selectors: {
        selectPopularProducts: (state) => state.popularProducts,
        selectProductsWithDiscount: (state) => state.productsWithDiscount,
        selectProductStatus: (state) => state.statusOfProduct,
    },
});

export const {getPopularAsync, getWithDiscountAsync, getProductById, getRandomProduct, setProductStatus} =
    carouselProductsSlice.actions;

export const carouselProductsReducer = carouselProductsSlice.reducer;

export const {selectPopularProducts, selectProductStatus, selectProductsWithDiscount} =
    carouselProductsSlice.selectors;
