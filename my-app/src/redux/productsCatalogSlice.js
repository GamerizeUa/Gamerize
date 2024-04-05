import {createSlice} from '@reduxjs/toolkit';

const sortingOperations = {
    'Ціна: Від нижчої': (a, b) => a.price - b.price,
    'Назва: Я - А': (a, b) => b.name.localeCompare(a.name),
    'Ціна: Від вищої': (a, b) => b.price - a.price,
    'Назва: А - Я': (a, b) => a.name.localeCompare(b.name),
};

const initialState = {
    products: [],
    sortingMethod: ''
}

export const productsCatalogSlice = createSlice({
    name: "productsCatalog",
    initialState,
    reducers: {
        setProductsCatalog: (state, action) => {
            state.products = action.payload;
            if (state.sortingMethod && sortingOperations[state.sortingMethod]) {
                state.products = state.products.sort(sortingOperations[state.sortingMethod]);
            }
        },
        setSortingMethod: (state, action) => {
            state.sortingMethod = action.payload;
            state.products = state.products.sort(sortingOperations[state.sortingMethod])
        }
    }
});

export const {setProductsCatalog, setSortingMethod} = productsCatalogSlice.actions;
export default productsCatalogSlice.reducer;