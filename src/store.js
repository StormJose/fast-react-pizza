import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice"
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
import {thunk} from 'redux-thunk'

const persistConfig ={
    key: 'root',
    storage: storageSession
}

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    user: userReducer,
    // cart: cartReducer,
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    thunk,
  ],
});

export default store

export const persistor = persistStore(store)
