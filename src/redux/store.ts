import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products/productSlice'
import categoryReducer from './slices/categories/categorySlice'
import OrdersReducer from './slices/Orders/orderSlice'
import UsersReducer from './slices/UsersList/userSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoryReducer,
    Orders: OrdersReducer,
    Users: UsersReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
