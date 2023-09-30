import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from '../utils/cartUtils'
const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

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
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCart(state)
    }
  }
})

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions
export default cartSlice.reducer;