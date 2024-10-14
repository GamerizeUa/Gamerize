import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    history: [],
};
const isAlreadyAdded = (productList, newProduct) =>
    productList.some((product) => product.id == newProduct.id);

const viewsHistorySlice = createSlice({
    name: 'views-history',
    initialState,
    reducers: {
        addToHistory: (state, action) => {
            if (!action.payload) return;

            const isNewProduct = !isAlreadyAdded(state.history, action.payload);

            if (isNewProduct) {
                state.history.push(action.payload);
            }
        },
    },
});

export default viewsHistorySlice.reducer;
export const { addToHistory } = viewsHistorySlice.actions;
