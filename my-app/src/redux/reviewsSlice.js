import axios from "axios";
import { createAppSlice } from "./createAppSlice";

axios.defaults.baseURL = "https://gamerize.ltd.ua/";

const initialState = {
  status: "loading",
  productId: 0,
  reviewsList: [],
  totalPages: 0,
};

const reviewsSlice = createAppSlice({
  name: "reviews",
  initialState,
  reducers: (create) => ({
    clearReviews: create.reducer((state) => {
      state.reviewsList = [];
    }),
    setProductId: create.reducer((state, action) => {
      state.productId = action.payload;
    }),
    getReviewsPortionAsync: create.asyncThunk(
      async ({ productId, pageSize, page }) => {
        const response = await axios.get(
          `api/Feedback/GetAllByProduct/${productId}`,
          {
            params: {
              page,
              pageSize,
            },
          }
        );
        return {
          feedbacks: response.data.feedbacks,
          page,
          totalPages: response.data.totalPages,
        };
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "fulfilled";
          state.reviewsList[action.payload.page - 1] = action.payload.feedbacks;
          if (state.totalPages !== action.payload.totalPages)
            state.totalPages = action.payload.totalPages;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  selectors: {
    selectStatus: (state) => state.status,
    selectReviews: (state) => state.reviewsList,
    selectProductId: (state) => state.productId,
    selectTotalPages: (state) => state.totalPages,
  },
});

export const { getReviewsPortionAsync, clearReviews, setProductId } =
  reviewsSlice.actions;

export const reviewsReducer = reviewsSlice.reducer;

export const {
  selectCount,
  selectStatus,
  selectReviews,
  selectProductId,
  selectTotalPages,
} = reviewsSlice.selectors;
