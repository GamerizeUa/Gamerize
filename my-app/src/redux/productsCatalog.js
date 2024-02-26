import {createSlice} from '@reduxjs/toolkit';

export const productsCatalogSlice = createSlice({
    name: "productsCatalog",
    initialState: {value: []},
    reducers: {
        setProductsCatalog: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {setProductsCatalog} = productsCatalogSlice.actions;
export default productsCatalogSlice.reducer;