import { configureStore } from '@reduxjs/toolkit'

import CartReducer from './slices/Cart/cartSlice'
import categoryReducer from './slices/categories/categorySlice'
import OrdersReducer from './slices/orders/orderSlice'
import productsReducer from './slices/products/productSlice'
import UsersReducer from './slices/usersList/userSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoryReducer,
    orders: OrdersReducer,
    users: UsersReducer,
    cart: CartReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
