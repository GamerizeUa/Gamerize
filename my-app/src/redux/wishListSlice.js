import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productsIdList: [2, 3, 6, 21, 22, 23, 24, 25, 26, 27, 28],
    productsList: [
        {
            id: 21,
            discount: 20,
            name: "Дюна імперіум21",
            minPlayers: 4,
            maxPlayers: 6,
            minAge: 16,
            price: 2250,
            oldPrice: 2812,
            gameTimeMinutes: 80,
            photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
        },
        {
            id: 22,
            discount: 20,
            name: "Дюна імперіум22",
            minPlayers: 4,
            maxPlayers: 6,
            minAge: 16,
            price: 2250,
            oldPrice: 2812,
            gameTimeMinutes: 80,
            photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
        },
        {
            id: 23,
            discount: 20,
            name: "Дюна імперіум23",
            minPlayers: 4,
            maxPlayers: 6,
            minAge: 16,
            price: 2250,
            oldPrice: 2812,
            gameTimeMinutes: 80,
            photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
        },
        {
            id: 24,
            discount: 20,
            name: "Дюна імперіум24",
            minPlayers: 4,
            maxPlayers: 6,
            minAge: 16,
            price: 2250,
            oldPrice: 2812,
            gameTimeMinutes: 80,
            photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
        },
        {
            id: 25,
            discount: 20,
            name: "Дюна імперіум25",
            minPlayers: 4,
            maxPlayers: 6,
            minAge: 16,
            price: 2250,
            oldPrice: 2812,
            gameTimeMinutes: 80,
            photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
        },
        {
            id: 26,
            discount: 20,
            name: "Дюна імперіум26",
            minPlayers: 4,
            maxPlayers: 6,
            minAge: 16,
            price: 2250,
            oldPrice: 2812,
            gameTimeMinutes: 80,
            photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
        },
        {
            id: 27,
            discount: 20,
            name: "Дюна імперіум27",
            minPlayers: 4,
            maxPlayers: 6,
            minAge: 16,
            price: 2250,
            oldPrice: 2812,
            gameTimeMinutes: 80,
            photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
        },
        {
            id: 28,
            discount: 20,
            name: "Дюна імперіум28",
            minPlayers: 4,
            maxPlayers: 6,
            minAge: 16,
            price: 2250,
            oldPrice: 2812,
            gameTimeMinutes: 80,
            photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
        },
        {
            id: 2,
            discount: 20,
            name: "Дюна імперіум2",
            minPlayers: 4,
            maxPlayers: 6,
            minAge: 16,
            price: 2250,
            oldPrice: 2812,
            gameTimeMinutes: 80,
            photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
        },
        {
            id: 3,
            discount: 20,
            name: "Дюна імперіум3",
            minPlayers: 4,
            maxPlayers: 6,
            minAge: 16,
            price: 2250,
            oldPrice: 2812,
            gameTimeMinutes: 80,
            photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
        },
        {
            id: 6,
            discount: 20,
            name: "Дюна імперіум6",
            minPlayers: 4,
            maxPlayers: 6,
            minAge: 16,
            price: 2250,
            oldPrice: 2812,
            gameTimeMinutes: 80,
            photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
        },
    ],
};

const wishListSlice = createSlice({
    name: "wishList",
    initialState,
    reducers: {
        addToWishList: (state, action) => {
            state.productsIdList.push(action.payload);
            state.productsList.push({
                id: action.payload,
                discount: 20,
                name: "Дюна імперіум" + action.payload,
                minPlayers: 4,
                maxPlayers: 6,
                minAge: 16,
                price: 2250,
                oldPrice: 2812,
                gameTimeMinutes: 80,
                photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
            });
        },
        removeOneFromWishList: (state, action) => {
            state.productsIdList.splice(
                state.productsIdList.findIndex((id) => id === action.payload),
                1
            );
            state.productsList.splice(
                state.productsList.findIndex(
                    ({ id }) => id === action.payload
                ),
                1
            );
        },
        removeAllFromWishList: (state) => {
            state.productsIdList = [];
            state.productsList = [];
        },
    },
});

export const wishListReducer = wishListSlice.reducer;
export const { addToWishList, removeOneFromWishList, removeAllFromWishList } = wishListSlice.actions;
