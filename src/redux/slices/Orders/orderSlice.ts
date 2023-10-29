import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'

export type Order = {
  id: number
  productId: number
  userId: number
  purchasedAt: string
}

export type OrderState = {
  orders: Order[]
  error: null | string
  isLoading: boolean
  searchBy: number | string
}

const initialState: OrderState = {
  orders: [],
  error: null,
  isLoading: false,
  searchBy: 0 || ''
}

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const { data } = await api.get('/mock/e-commerce/orders.json')
  return data
})
export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    searchProducts: (state, action) => {
      state.searchBy = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Error: Fetching orders rejected.'
      })
  }
})

export const { searchProducts } = orderSlice.actions
export default orderSlice.reducer
