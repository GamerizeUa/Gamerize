import axios from "axios";
import { createAppSlice } from "./createAppSlice";

axios.defaults.baseURL = "https://gamerize.ltd.ua/api/Product/";

const initialState = {
  statusOfPopular: "loading",
  statusOfWithDiscount: "loading",
  popularProducts: [],
  productsWithDiscount: [],
};

const reviewsSlice = createAppSlice({
  name: "homeCarouselProducts",
  initialState,
  reducers: (create) => ({
    getPopularAsync: create.asyncThunk(
      async ({ count }) => {
        const response = await axios.get(
          `GetPopularProducts`,
          {
            params: {
              count,
            },
          }
        );
        console.log(response.data);
        return {
          products: response.data,
        };
      },
      {
        pending: (state) => {
          state.popularStatus = "loading";
        },
        fulfilled: (state, action) => {
            state.statusOfPopular = "fulfilled";
            state.popularProducts = action.payload.products;
            console.log(action.payload.products);
        },
        rejected: (state) => {
          state.popularStatus = "failed";
        },
      }
    ),
  }),
  selectors: {
    selectPopularProducts: (state) => state.popularProducts,
    selectProductsWithDiscount: (state) => state.productsWithDiscount,
  },
});

export const { getPopularAsync } =
  reviewsSlice.actions;

export const reviewsReducer = reviewsSlice.reducer;

export const {
    selectPopularProducts,
    selectProductsWithDiscount,
} = reviewsSlice.selectors;