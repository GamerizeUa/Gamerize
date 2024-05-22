import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  promoCode: "",
  giftCard: "",
};

const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: (create) => ({
    setPromoCode: create.reducer((state, action) => {
      state.promoCode = action.payload;
    }),
    setGiftCard: create.reducer((state, action) => {
      state.giftCard = action.payload;
    }),
  }),
});

export const { setPromoCode, setGiftCard } = discountSlice.actions;

export default discountSlice.reducer;
