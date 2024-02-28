export const selectCategories = (state) => state.categories.items;

export const selectGenres = (state) => state.genres.items;

export const selectThemes = (state) => state.themes.items;

export const selectWishListProductsIdList = (state) =>
    state.wishList.productsIdList;

export const selectWishListProductsList = (state) =>
    state.wishList.productsList;
