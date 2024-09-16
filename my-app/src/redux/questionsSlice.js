import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuestions = createAsyncThunk(
    "questions/fetchQuestions",
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const page = state.questions.currentPage;
            const response = await axios.get("https://gamerize.ltd.ua/api/Question/GetAll",
                {params: {page}});
            return response.data;
        } catch (error) {
            console.log(error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const deleteQuestions = createAsyncThunk(
    "questions/deleteQuestions",
    async (questionsToDelete, thunkAPI) => {
        try {
            await axios.delete("https://gamerize.ltd.ua/api/Question/Questions/Delete", {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: questionsToDelete
            });
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchQuestionsBySearch = createAsyncThunk(
    "questions/fetchQuestionsBySearch",
    async(searchTerm, thunkAPI) => {
        try{
            const response = await axios.get("https://gamerize.ltd.ua/api/Question/Questions/Search",
                {params: {term: searchTerm}})
            return response.data;
        }catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


const initialState = {
    questions: [],
    totalQuestions: null,
    totalPages: null,
    currentPage: 1,
    loading: false,
    error: ''
}

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: () => ({
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },

    }),
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload.questions;
                state.totalQuestions = action.payload.totalMessages;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.page;
            })
            .addCase(deleteQuestions.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchQuestionsBySearch.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload.questions;
                state.totalQuestions = action.payload.totalMessages;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    }
})

export const { setCurrentPage} = questionsSlice.actions;

export default questionsSlice.reducer;