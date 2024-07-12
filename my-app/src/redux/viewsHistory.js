import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    history: [],
    isEmpty: true,
};
const isAlreadyAdded = (productList, newProduct) =>
    productList.some((product) => product.id == newProduct.id);

const viewsHistorySlice = createSlice({
    name: 'views-history',
    initialState,
    reducers: {
        addToHistory: (state, action) => {
            const isNewProduct = !isAlreadyAdded(state.history, action.payload);

            if (isNewProduct) {
                state.history.push(action.payload);
            }

            state.isEmpty = state.history.length === 0;
        },
    },
});

export default viewsHistorySlice.reducer;
export const { addToHistory } = viewsHistorySlice.actions;
