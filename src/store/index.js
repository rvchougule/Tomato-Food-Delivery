import itemsReducer from "./slices/itemsSlice";
import cartReducer from "./slices/cartSlice";
import cartFirebaseReducer from "./slices/cartSliceFirebase";
import userReducer from "./slices/userSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
    cartItems: cartReducer,
    cartFirebaseItems: cartFirebaseReducer,
  },
});
