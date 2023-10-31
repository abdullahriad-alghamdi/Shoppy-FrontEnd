import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/Products/productSlice'
import categoryReducer from './slices/Categories/categorySlice'
import OrdersReducer from './slices/Orders/orderSlice'
import UsersReducer from './slices/UsersList/userSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoryReducer,
    orders: OrdersReducer,
    users: UsersReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
