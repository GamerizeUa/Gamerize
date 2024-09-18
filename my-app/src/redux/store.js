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
import { languagesReducer } from "./categories/languagesSlice.js";
import cartSlice from "./cartSlice.js";
import discountReducer from "./discountSlice";
import viewsHistorySlice from "./viewsHistory.js";
import { carouselProductsReducer } from "./productsSlice.js";
import { orderHistoryReducer } from "./orderHistorySlice.js";
import {formsDisplayingReducer} from "./formsDisplaying.js";
import {profileReducer} from "./profileSlice.js";
import questionsReducer from './questionsSlice.js'
import orderSlice from "./orderSlice.js";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "views"],
};

const rootReducer = combineReducers({
  categories: categoriesReducer,
  genres: genresReducer,
  themes: themesReducer,
  puzzles: puzzlesReducer,
  mindGames: mindGamesReducer,
  languages: languagesReducer,
  translationTab: translationTabReducer,
  productsCatalog: productsCatalogReducer,
  wishList: wishListReducer,
  formsDisplaying: formsDisplayingReducer,
  cart: cartSlice,
  views: viewsHistorySlice,
  discount: discountReducer,
  carouselProducts: carouselProductsReducer,
  orderHistory: orderHistoryReducer,
  profile: profileReducer,
  questions: questionsReducer,
  order: orderSlice
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
