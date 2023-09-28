import { PRODUCTS_URL } from "../constats";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints : builder => ({
    getProducts : builder.query({
      query : () => ({
        url : PRODUCTS_URL
      }), 
      keepUnusedDataFor : 5
    })
  })
})

export const {useGetProductsQuery} = productsApiSlice;