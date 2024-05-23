import { createSelector } from "@reduxjs/toolkit";

export const selectCategories = (state) => state.categories.items;

export const selectGenres = (state) => state.genres.items;

export const selectThemes = (state) => state.themes.items;

export const selectPuzzles = (state) => state.puzzles.items;

export const selectMindGames = (state) => state.mindGames.items;

export const selectWishListProductsIdList = (state) =>
  state.wishList.productsIdList;

export const selectWishListProductsList = (state) =>
  state.wishList.productsList;

export const selectCart = createSelector(
  (state) => state.cart,
  (cart) => ({ ...cart })
);
export const selectIsInCart = createSelector(
  [selectCart, (state, productId) => productId],
  ({ productList }, productId) =>
    productList.some((product) => product.id === productId)
);

export const selectPromoCode = (state) => state.discount.promoCode;
export const selectGiftCard = (state) => state.discount.giftCard;
