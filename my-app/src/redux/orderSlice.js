import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    productsIds : [],
    quantity: [],
    user: {
        name: '',
        email: '',
        phoneNumber: '',
        city: '',
        deliveryAddress: ''
    },
    comment: '',
    paymentMethodId: '',
    deliveryMethodId: '',
    totalPrice: 0,
    totalDiscount: 0,
    discountCouponId: 0,
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
        setUserInfo: (state, action) => {
            Object.assign(state.user, action.payload);
        },
        setProductItem: (state, action) => {
            const { id, count } = action.payload;
            const productIndex = state.productsIds.indexOf(id);

            if (productIndex !== -1) {
                state.quantity[productIndex] = count;
            } else {
                state.productsIds.push(id);
                state.quantity.push(count);
            }
        },
        setDiscountInfo: (state, action) => {
            state.totalDiscount = action.payload.discountAmount;
            state.discountCouponId = action.payload.discountId;
        }
    }
})

export const {setField, setUserInfo,
    setProductItem,
    setDiscountInfo} =
    orderSlice.actions;

export default orderSlice.reducer;