import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../Products/productSlice'

export type CartState = {
  inCart: Product[]
  totalQuantity: number
  totalPrice: number
}


const initialState: CartState = {
  inCart: [],
  totalQuantity: 0,
  totalPrice: 0
}


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {

      const newProduct: Product = action.payload
      const isExist = state.inCart.find((cart) => cart.id === newProduct.id)

      if (!isExist) {
        state.inCart = [...state.inCart, { ...newProduct, quantity: 1 }]
      } else {
        state.inCart = state.inCart.map((product) =>
          product.id === newProduct.id ? { ...product, quantity: product.quantity + 1 } : product
        )
      }

      state.totalQuantity = state.inCart.reduce((total, product) => total + product.quantity, 0)

      state.totalPrice = state.inCart.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      )
      localStorage.setItem('cart', JSON.stringify(state.inCart))
    },
    removeFromCart: (state, action) => {
      const id: number = action.payload
      state.inCart = state.inCart.filter((product) => product.id !== id)
      state.totalQuantity = state.inCart.reduce((total, product) => total + product.quantity, 0)
      state.totalPrice = state.inCart.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      )

    },
    IncreaseQuantity: (state, action) => {
      const productIncrease: Product = action.payload
      state.inCart.map((product) => {
        if (product.id == productIncrease.id) {
          product.quantity += 1
        }
      })
      state.totalQuantity = state.inCart.reduce((total, product) => total + product.quantity, 0)
      state.totalPrice = state.inCart.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      )
    },
    DecreaseQuantity: (state, action) => {
      const productIncrease: Product = action.payload
      state.inCart.map((product) => {
        if (product.id == productIncrease.id) {
          if (product.quantity > 0) {
            product.quantity -= 1
          }
          if (product.quantity == 0) {
            state.inCart = state.inCart.filter((product) => product.id !== productIncrease.id)
          }
        }
      })
      state.totalQuantity = state.inCart.reduce((total, product) => total + product.quantity, 0)
      state.totalPrice = state.inCart.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      )
    },

  }
})
export const { addToCart, removeFromCart, IncreaseQuantity, DecreaseQuantity } = cartSlice.actions

export default cartSlice.reducer
