import { createSlice } from "@reduxjs/toolkit";

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


      // Calculate items price
      state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price, 0));

      // Calculate shipping price. Policy : If order is above $100 then free, else $10 shipping 
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      // Calculate tax price (15% tax)
      state.taxPrice = addDecimals(Number((0.12 * state.itemsPrice).toFixed(2)))

      // Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem('cart', JSON.stringify(state))
    }
  }
})
console.log(cartSlice);
export const { addToCart } = cartSlice.actions
export default cartSlice.reducer;