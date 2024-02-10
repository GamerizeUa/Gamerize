import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { categoriesReducer } from "./categories/categoriesSlice";
import { genresReducer } from "./categories/genreSlice";
import translationTabReducer from "./translationTab.js";
import { themesReducer } from "./categories/themesSlice.js";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  genres: genresReducer,
  themes: themesReducer,
  translationTab: translationTabReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

//  export const persistor = persistStore(store);
