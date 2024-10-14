import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  promoCode: "",
  error: "",
  discountValue: 0,
  discountId: 0,
  loading: true
};

export const sendPromoCode = createAsyncThunk(
    'discount/sendPromoCode',
    async (_, thunkAPI) =>{
      try {
        const state = thunkAPI.getState();
        const promoCode = state.discount.promoCode;

        const response = await axios.get("https://gamerize.ltd.ua/api/DiscountCoupon/discount",
            {params: {promoCode}}
        );
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }

)

const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    setPromoCode: (state, action) => {
      state.promoCode = action.payload;
    },
    clearDiscounts: (state) => {
      state.promoCode = "";
      state.discountValue = 0;
      state.discountId =  0;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(sendPromoCode.fulfilled, (state, action) => {
          state.loading = false;
          state.discountValue = action.payload.discount;
          state.discountId = action.payload.id;
        })
        .addCase(sendPromoCode.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addMatcher(
            (action) => action.type.endsWith('/pending'),
            (state) => {
              state.loading = true;
              state.error = null;
            }
        )
}});

export const { setPromoCode, clearDiscounts } =
  discountSlice.actions;

export default discountSlice.reducer;
