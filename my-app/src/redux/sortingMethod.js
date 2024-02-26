import {createSlice} from '@reduxjs/toolkit';

export const sortingMethodSlice = createSlice({
    name: "sortingMethod",
    initialState: { value: ''},
    reducers: {
        setMethod: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {setMethod} = sortingMethodSlice.actions;
export default sortingMethodSlice.reducer;