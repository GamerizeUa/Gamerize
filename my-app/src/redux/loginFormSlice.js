import {createAppSlice} from "./createAppSlice";

const initialState = {
    isDisplayedLoginPopUp: false,
    isDisplayedRegistrationPopUp: false,
    isDisplayedEmailForm: false,
};

const loginFormSlice = createAppSlice({
    name: "loginForm",
    initialState,
    reducers: () => ({
        assignIsDisplayedLoginPopUp: (state, action) => {
            state.isDisplayedLoginPopUp = action.payload;
        },
        assignIsDisplayedRegistrationPopUp: (state, action) => {
            state.isDisplayedRegistrationPopUp = action.payload;
        },
        assignIsDisplayedEmailForm: (state, action) => {
            state.isDisplayedEmailForm = action.payload;
        },
    }),
});

export const loginFormReducer = loginFormSlice.reducer;
export const {
    assignIsDisplayedLoginPopUp,
    assignIsDisplayedRegistrationPopUp,
    assignIsDisplayedEmailForm
} = loginFormSlice.actions;
