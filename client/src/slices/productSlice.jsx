import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  pagination: {
    total: 0,
    limit: 10,
    page: 1,
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProducts: (state, action) => {
      state.products.push(...action.payload);
    },
  },
});

export const { fetchProducts } = productSlice.actions;

export const productReducer = productSlice.reducer;
