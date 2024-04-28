import {createSlice} from '@reduxjs/toolkit';

export const translationTabSlice = createSlice({
    name: "translationTab",
    initialState: {value: {translation: 0, lineWidth: 0}},
    reducers: {
        changeTranslation: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {changeTranslation} = translationTabSlice.actions;
export default translationTabSlice.reducer;
