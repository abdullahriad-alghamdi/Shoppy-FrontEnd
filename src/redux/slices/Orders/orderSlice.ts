import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'
import axios from 'axios'
import { baseURl } from '../usersList/userSlice'

interface OrderProduct {
  product: string
  quantity: number
}

interface Payment {
  paymentMethod: 'Credit Card' | 'Apple Pay'
  amount: number
}

// Type for shipping details in an order
interface Shipping {
  address: string
  city: string
  postalCode: string
  country: string
}

// Type for an individual order
interface Order {
  _id: string
  buyer: string
  products: OrderProduct[]
  payment: Payment
  status: 'Pending' | 'Processed' | 'Shipped' | 'Delivered' | 'Canceled' // Adjust statuses as needed
  totalPrice: number
  shipping: Shipping
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

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURl}orders/all-orders`)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
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

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = action.payload.payload
      })

      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true
          state.error = null
        }
      )

      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false
          state.error = action.error.message
        }
      )
  }
})

export const { searchProducts } = orderSlice.actions
export default orderSlice.reducer
