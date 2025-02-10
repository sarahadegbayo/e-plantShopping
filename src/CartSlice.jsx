// CartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],  // Array to store cart items
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += 1; // If the item already exists, increment its quantity
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Add new item to cart with quantity 1
      }
    },
    // Remove item from cart
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    // Update item quantity
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.name === action.payload.name);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;

