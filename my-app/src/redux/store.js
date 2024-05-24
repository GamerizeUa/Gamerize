import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { categoriesReducer } from "./categories/categoriesSlice";
import { genresReducer } from "./categories/genresSlice.js";
import translationTabReducer from "./translationTab.js";
import { themesReducer } from "./categories/themesSlice.js";
import productsCatalogReducer from "./productsCatalogSlice.js";
import { wishListReducer } from "./wishListSlice.js";
import { puzzlesReducer } from "./categories/puzzlesSlice.js";
import { mindGamesReducer } from "./categories/mindGamesSlice.js";
import { reviewsReducer } from "./reviewsSlice.js";
import cartSlice from "./cartSlice.js";
import discountReducer from "./discountSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  categories: categoriesReducer,
  genres: genresReducer,
  themes: themesReducer,
  puzzles: puzzlesReducer,
  mindGames: mindGamesReducer,
  translationTab: translationTabReducer,
  productsCatalog: productsCatalogReducer,
  wishList: wishListReducer,
  reviews: reviewsReducer,
  cart: cartSlice,
  discount: discountReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
});
export const persistor = persistStore(store);
