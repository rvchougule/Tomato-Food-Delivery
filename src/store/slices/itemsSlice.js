import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "items",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },
  reducers: {
    fetchItems(state) {
      state.loading = true;
    },
    fetchItemsError(state, action) {
      state.loading = false;
      state.error = action.payload || "Something went wrong!";
    },
    updateAllItems(state, action) {
      state.loading = false;
      state.list = action.payload;
      state.error = "";
    },
  },
});

export const getAllItems = (state) => state.items.list;
export const getItemsLoadingState = (state) => state.items.loading;
export const getItemsError = (state) => state.items.error;

export const { updateAllItems, fetchItems, fetchItemsError } = slice.actions;

export default slice.reducer;
