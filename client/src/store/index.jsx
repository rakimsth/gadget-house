import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../slices/cartSlice";
import { productReducer } from "../slices/productSlice";
import { orderReducer } from "../slices/orderSlice";

import storage from "redux-persist/lib/storage/";

import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const persistConfig = {
  key: "gh-cart",
  storage,
};

const persistCart = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistCart,
    products: productReducer,
    orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
});

export const newStore = persistStore(store);
