import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  promoCode: "",
  giftCard: "",
};

const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    setPromoCode: (state, action) => {
      state.promoCode = action.payload;
    },
    setGiftCard: (state, action) => {
      state.giftCard = action.payload;
    },
    clearDiscounts: (state) => {
      state.promoCode = "";
      state.giftCard = "";
    },
  },
});

export const { setPromoCode, setGiftCard, clearDiscounts } =
  discountSlice.actions;

export default discountSlice.reducer;
