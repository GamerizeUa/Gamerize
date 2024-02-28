import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { categoriesReducer } from "./categories/categoriesSlice";
import { genresReducer } from "./categories/genreSlice";
import translationTabReducer from "./translationTab.js";
import { themesReducer } from "./categories/themesSlice.js";
import productsCatalogReducer from './productsCatalog.js';
import sortingMethodReducer from "./sortingMethod.js";
import { wishListReducer } from "./wishListSlice.js";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  genres: genresReducer,
  themes: themesReducer,
  translationTab: translationTabReducer,
  productsCatalog: productsCatalogReducer,
  sortingMethod: sortingMethodReducer,
  wishList: wishListReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

//  export const persistor = persistStore(store);
