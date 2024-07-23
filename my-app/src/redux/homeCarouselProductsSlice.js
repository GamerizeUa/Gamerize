import axios from "axios";
import { createAppSlice } from "./createAppSlice";

axios.defaults.baseURL = "https://gamerize.ltd.ua/";

const initialState = {
    statusOfPopular: "loading",
    statusOfWithDiscount: "loading",
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
                        ({ product, newPrice }) => {
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
    },
});

export const { getPopularAsync, getWithDiscountAsync } = carouselProductsSlice.actions;

export const carouselProductsReducer = carouselProductsSlice.reducer;

export const { selectPopularProducts, selectProductsWithDiscount } =
    carouselProductsSlice.selectors;
