import itemsReducer from "./slices/itemsSlice";
import cartReducer from "./slices/cartSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    cartItems: cartReducer,
  },
});
