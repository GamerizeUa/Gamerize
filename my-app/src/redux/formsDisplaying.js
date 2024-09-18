import {createAppSlice} from "./createAppSlice";

const initialState = {
    isDisplayedLoginPopUp: false,
    isDisplayedRegistrationPopUp: false,
    isDisplayedEmailForm: false,
    isDisplayedNewPasswordForm: false,
    isDisplayedDeleteAccountPopUp: false
};

const formsDisplaying = createAppSlice({
    name: "formsDisplaying",
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
        assignIsDisplayedNewPasswordForm: (state, action) => {
            state.isDisplayedNewPasswordForm = action.payload
        },
        assignIsDisplayedDeleteAccountPopUp: (state, action) => {
            state.isDisplayedDeleteAccountPopUp = action.payload;
        }
    }),
});

export const formsDisplayingReducer = formsDisplaying.reducer;
export const {
    assignIsDisplayedLoginPopUp,
    assignIsDisplayedRegistrationPopUp,
    assignIsDisplayedEmailForm,
    assignIsDisplayedNewPasswordForm,
    assignIsDisplayedDeleteAccountPopUp
} = formsDisplaying.actions;
