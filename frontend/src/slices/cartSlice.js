import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from '../utils/cartUtils'
const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemToAdd = action.payload;
      const itemToAddAlreadyInCart = state.cartItems.find(item => item._id === itemToAdd._id);

      if (itemToAddAlreadyInCart) {
        state.cartItems = state.cartItems.map(item => itemToAddAlreadyInCart._id === item._id ? itemToAdd : item)
      } else {
        state.cartItems = [...state.cartItems, itemToAdd]
      }

      updateCart(state)

    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload)
      updateCart(state);
    }
  }
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer;