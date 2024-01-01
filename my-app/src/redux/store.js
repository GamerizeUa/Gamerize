import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { categoriesReducer } from "./categories/categoriesSlice";
import { genresReducer } from "./categories/genreSlice";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  genres: genresReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

//  export const persistor = persistStore(store);
