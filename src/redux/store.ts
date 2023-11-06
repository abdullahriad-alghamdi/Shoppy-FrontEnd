import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products/productSlice'
import categoryReducer from './slices/categories/categorySlice'
import OrdersReducer from './slices/orders/orderSlice'
import UsersReducer from './slices/usersList/userSlice'
import CartReducer from './slices/Cart/cartSlice'

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
