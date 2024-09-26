import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const createNewOrder = createAsyncThunk(
    "newOrder/createNewOrder",
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            await axios.post("https://gamerize.ltd.ua/api/Order/Create", state.newOrder);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

const initialState = {
    productId : [],
    quantity: [],
    unregisteredUser: {
        name: "",
        email: "",
        phoneNumber: "",
        city: "",
        deliveryAddress: ""
    },
    comment: "",
    paymentMethodId: 0,
    deliveryMethodId: 0,
    totalPrice: 0,
    totalDiscount: 0,
    discountCouponId: 0,
}

const newOrderSlice = createSlice({
    name: "newOrder",
    initialState,
    reducers: {
        setField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
        setUserInfo: (state, action) => {
            Object.assign(state.unregisteredUser, action.payload);
        },
        setProductItem: (state, action) => {
            const { id, count } = action.payload;
            const productIndex = state.productId.indexOf(id);

            if (productIndex !== -1) {
                state.quantity[productIndex] = count;
            } else {
                state.productId.push(id);
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
    newOrderSlice.actions;

export default newOrderSlice.reducer;