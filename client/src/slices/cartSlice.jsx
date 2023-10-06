import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  quantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // if item exist
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        // new item
        state.cart.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      const newItems = state.cart.filter((item) => item.id !== action.payload);
      state.cart = newItems;
    },
    increaseQuantity: (state, action) => {},
    decreaseQuantity: (state, action) => {},
  },
});

export const { addToCart, removeItem, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;
