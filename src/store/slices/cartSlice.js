import { createSelector, createSlice } from "@reduxjs/toolkit";

const findItemIndex = (state, action) =>
  state.findIndex((cartItem) => cartItem.itemId === action.payload.itemId);

const slice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },
  reducers: {
    addCartItem(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      if (existingItemIndex !== -1) state.list[existingItemIndex].quantity += 1;
      else state.list.push({ ...action.payload, quantity: 1 });
    },
    removeCartItem(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      state.list.splice(existingItemIndex, 1);
    },
    increaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      state.list[existingItemIndex].quantity += 1;
    },
    decreaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      if (existingItemIndex !== -1) {
        state.list[existingItemIndex].quantity -= 1;
        if (state.list[existingItemIndex].quantity === 0) {
          state.list.splice(existingItemIndex, 1);
        }
      }
    },
  },
});

const getItems = (state) => state.items.list;
export const getCartItemsList = (state) => state.cartItems.list;

export const getCartItems = createSelector(
  [getItems, getCartItemsList],
  (items, cartItems) => {
    return cartItems
      .map(({ itemId, quantity }) => {
        const cartItem = items.find((item) => item.itemId === itemId);
        return { ...cartItem, quantity };
      })
      .filter(({ title }) => title);
  }
);

export const getAllCartItems = createSelector(getCartItems, (cartItems) =>
  cartItems.slice()
);

export const getCartLoading = (state) => state.cartItems.loading;
export const getCartError = (state) => state.cartItems.error;

export const {
  addCartItem,
  removeCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} = slice.actions;

export default slice.reducer;
