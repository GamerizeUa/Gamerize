import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { categoriesReducer } from "./categories/categoriesSlice";
import { genresReducer } from "./categories/genresSlice.js";
import translationTabReducer from "./translationTab.js";
import { themesReducer } from "./categories/themesSlice.js";
import productsCatalogReducer from "./productsCatalogSlice.js";
import { wishListReducer } from "./wishListSlice.js";
import { puzzlesReducer } from "./categories/puzzlesSlice.js";
import { mindGamesReducer } from "./categories/mindGamesSlice.js";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  genres: genresReducer,
  themes: themesReducer,
  puzzles: puzzlesReducer,
  mindGames: mindGamesReducer,
  translationTab: translationTabReducer,
  productsCatalog: productsCatalogReducer,
  wishList: wishListReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

//  export const persistor = persistStore(store);
