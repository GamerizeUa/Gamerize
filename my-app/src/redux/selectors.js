import { createSelector } from '@reduxjs/toolkit';

export const selectCategories = (state) => state.categories.items;

export const selectGenres = (state) => state.genres.items;

export const selectThemes = (state) => state.themes.items;

export const selectPuzzles = (state) => state.puzzles.items;

export const selectMindGames = (state) => state.mindGames.items;

export const selectLanguages = (state) => state.languages.items;

export const selectWishListProductsIdList = (state) =>
    state.wishList.productsIdList;
export const selectWishListAddRemoveStatus = (state) =>
    state.wishList.statusOfWishing;
export const selectWishListProductsList = (state) =>
    state.wishList.productsList;
export const selectWishListPagesAmount = (state) => state.wishList.pagesAmount;
export const selectCart = createSelector(
    (state) => state.cart,
    (cart) => ({ ...cart })
);
export const selectIsDisplayedLoginPopUp = (state) =>
    state.formsDisplaying.isDisplayedLoginPopUp;
export const selectIsDisplayedRegistrationPopUp = (state) =>
    state.formsDisplaying.isDisplayedRegistrationPopUp;
export const selectIsDisplayedEmailForm = (state) =>
    state.formsDisplaying.isDisplayedEmailForm;

export const selectIsInCart = createSelector(
    [selectCart, (state, productId) => productId],
    ({ productList }, productId) =>
        productList.some((product) => product.id === productId)
);

export const selectCartProductsCount = createSelector(
    selectCart,
    ({ productList }) =>
        productList.reduce(
            (totalCount, product) => totalCount + product.count - 1,
            productList.length
        )
);
export const selectPromoCode = (state) => state.discount.promoCode;
export const selectGiftCard = (state) => state.discount.giftCard;
// export const selectProductById = createSelector(
//     [(state) => state.productsCatalog, (state, productID) => productID],
//     (catalog, productID) =>
//         catalog.products.find((product) => product?.id == productID)
// );

export const selectViewsHistory = createSelector(
    [(state) => state.views, (state, productID) => productID],
    (views, productID) => {
        const { history } = views;

        if (history.length === 0) return history;

        const relevantHistory =
            history.length <= 10 ? history : history.slice(9);

        return relevantHistory.filter((product) => product.id !== productID);
    }
);

export const selectProducts = (state) => state.productsCatalog;
export const selectOrdersByUserAndStatus = ({ orderHistory }, status) => {
    if (status == 'Усі') return orderHistory;

    const filteredOrders = orderHistory.orders.filter(
        (order) => order.status.status === status
    );

    return {
        orders: filteredOrders,
        isLoading: orderHistory.isLoading,
        error: orderHistory.error,
    };
};
