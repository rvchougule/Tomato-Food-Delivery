import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { db } from "../../firebase";
import { selectUserDetails } from "./userSlice";

// Debouncing helper function
let updateTimeout;
const debounce = (func, delay) => {
  return (...args) => {
    if (updateTimeout) clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => func(...args), delay);
  };
};

// Debounce delay time (200ms)
const DEBOUNCE_DELAY = 200;

// Create a debounced version of the Firestore update
const debouncedSetDoc = debounce(async (cartRef, cartItems) => {
  await setDoc(cartRef, { cartItems }, { merge: true });
}, DEBOUNCE_DELAY);

// Add item to Firestore with debouncing
export const addCartItemToFirestore = createAsyncThunk(
  "cartFirebase/addCartItemToFirestore",
  async (itemId, thunkAPI) => {
    const state = thunkAPI.getState();
    const userDetails = selectUserDetails(state);
    const cartItemList = getCartFirebaseItemsList(state);
    const cartRef = doc(db, "Carts", userDetails.uid);
    const cartSnap = await getDoc(cartRef);

    // Firestore updated data
    const cartItems = cartSnap.exists() ? cartSnap.data().cartItems || {} : {};
    const item = cartItemList.find((item) => item.itemId === itemId); // redux latest cartItem quantity
    const currentQuantity = item ? item.quantity || 0 : 0;

    // Update or add the item
    cartItems[itemId] = currentQuantity + 1;

    // Debounced Firestore operation
    await new Promise((resolve) => {
      debouncedSetDoc(cartRef, cartItems);
      resolve();
    });

    return { uid: userDetails.uid, itemId, quantity: cartItems[itemId] };
  }
);

// Decrease item quantity with debouncing
export const decreaseCartItemToFirestore = createAsyncThunk(
  "cartFirebase/decreaseCartItemToFirestore",
  async (itemId, thunkAPI) => {
    const state = thunkAPI.getState();
    const userDetails = selectUserDetails(state);
    const cartItemList = getCartFirebaseItemsList(state);

    const cartRef = doc(db, "Carts", userDetails.uid);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      const cartItems = cartSnap.data().cartItems || {};
      const item = cartItemList.find((item) => item.itemId === itemId);
      const currentQuantity = item ? item.quantity || 0 : 0;

      if (currentQuantity > 0) {
        const newQuantity = currentQuantity - 1;

        if (newQuantity > 0) {
          // Update the quantity
          cartItems[itemId] = newQuantity;

          // Debounced Firestore operation
          await new Promise((resolve) => {
            debouncedSetDoc(cartRef, cartItems);
            resolve();
          });

          return { uid: userDetails.uid, itemId, quantity: newQuantity };
        } else {
          // Remove the item if quantity is 0
          await new Promise((resolve) => {
            debounce(async () => {
              await updateDoc(cartRef, {
                [`cartItems.${itemId}`]: deleteField(),
              });
              resolve();
            }, DEBOUNCE_DELAY)();
          });

          return { uid: userDetails.uid, itemId, quantity: 0 };
        }
      }
    }
  }
);

// Fetch cart items
export const fetchCartItems = createAsyncThunk(
  "cartFirebase/fetchCartItems",
  async (uid, thunkAPI) => {
    const state = thunkAPI.getState();
    const userDetails = selectUserDetails(state);
    const cartRef = doc(db, "Carts", userDetails.uid);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      return cartSnap.data().cartItems;
    } else {
      return {}; // Empty cart if not exists
    }
  }
);

// Delete cart item with debouncing
export const deleteCartItem = createAsyncThunk(
  "cartFirebase/deleteCartItem",
  async (itemId, thunkAPI) => {
    const state = thunkAPI.getState();
    const userDetails = selectUserDetails(state);
    const cartRef = doc(db, "Carts", userDetails.uid);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      const cartItems = cartSnap.data().cartItems || {};
      if (cartItems[itemId]) {
        // Debounced Firestore operation
        await new Promise((resolve) => {
          debounce(async () => {
            await updateDoc(cartRef, {
              [`cartItems.${itemId}`]: deleteField(),
            });
            resolve();
          }, DEBOUNCE_DELAY)();
        });

        return { uid: userDetails.uid, itemId };
      }
    }
    throw new Error("Item does not exist in the cart.");
  }
);
const findItemIndex = (state, action) =>
  state.findIndex((cartItem) => cartItem.itemId === action.payload.itemId);

const slice = createSlice({
  name: "cartFirebase",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        const cartItemsList = [];
        for (let [itemId, quantity] of Object.entries(action.payload)) {
          cartItemsList.push({ itemId, quantity });
        }
        state.list = cartItemsList;
      })
      .addCase(addCartItemToFirestore.fulfilled, (state, action) => {
        const existingItemIndex = findItemIndex(state.list, action);
        if (existingItemIndex !== -1) {
          state.list[existingItemIndex].quantity += 1;
        } else {
          state.list.push({
            itemId: action.payload.itemId,
            quantity: action.payload.quantity,
          });
        }
      })
      .addCase(decreaseCartItemToFirestore.fulfilled, (state, action) => {
        const item = state.list.find(
          (cartItem) => cartItem.itemId === action.payload.itemId
        );
        if (item) {
          if (action.payload.quantity > 0) {
            item.quantity = action.payload.quantity;
          } else {
            state.list = state.list.filter(
              (cartItem) => cartItem.itemId !== action.payload.itemId
            );
          }
        }
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (cartItem) => cartItem.itemId !== action.payload.itemId
        );
      });
  },
});

export const getItems = (state) => state.items.list;
export const getCartFirebaseItemsList = (state) => state.cartFirebaseItems.list;

export default slice.reducer;
