import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from '../utils/cartUtils'
const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [] };

const addDecimals = num => {
  return (Math.round(num * 100) / 100).toFixed(2)
}
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

    }
  }
})
console.log(cartSlice);
export const { addToCart } = cartSlice.actions
export default cartSlice.reducer;