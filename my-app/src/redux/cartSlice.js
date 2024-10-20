import { calculateTotalDiscount } from '@/utils/discounts';
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
                const newProduct = { ...action.payload, count: 1 };

                state.isEmpty = false;
                state.total += action.payload.price;
                state.productList.push(newProduct);
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
            }
        },
        clearCart: (state) => {
            state.productList = [];
            state.total = 0;
            state.isEmpty = true;
        },
    },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, updateCartProduct, clearCart } =
    cartSlice.actions;
