import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    isEmpty: true,
    productList: [],
    total: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const productExists = state.productList.some(
                (product) => product.id === action.payload.id
            );
            if (!productExists) {
                state.isEmpty = false;
                state.total += action.payload.price;
                state.productList.push({ ...action.payload, count: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const product = state.productList.find(
                (product) => product.id === action.payload
            );
            state.total -= product.price * product.count;
            state.productList = state.productList.filter(
                (product) => product.id !== action.payload
            );
            state.isEmpty = state.productList.length === 0;
        },
        updateCartProduct: (state, action) => {
            const { id, modifier } = action.payload;
            const product = state.productList.find(
                (product) => product.id === id
            );

            if (product) {
                product.count += modifier;
                state.total += product.price * modifier;

                if (product.count <= 0) {
                    state.productList = state.productList.filter(
                        (product) => product.id !== id
                    );
                    state.isEmpty = state.productList.length === 0;
                }
            }
        },
    },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, updateCartProduct } =
    cartSlice.actions;
