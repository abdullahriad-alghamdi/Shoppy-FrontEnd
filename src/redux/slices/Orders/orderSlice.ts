import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios'
import { Product } from '../products/productSlice'
import { baseURl } from '../usersList/userSlice'
import OrderDetails from '../../../pages/general/OrderDetails'

type OrderProduct = {
  product: Product
  quantity: number
}

type PaymentMethod = 'Credit Card' | 'Apple Pay'

type Payment = {
  paymentMethod: PaymentMethod
  amount: number
}

// Type for shipping details in an order
type Shipping = {
  address: string
  city: string
  postalCode: string
  country: string
}

type OrderStatus = 'Pending' | 'Processed' | 'Shipped' | 'Delivered' | 'Canceled'

type buyer = {
  _id: string
  name: string
  username: string
}

// Type for an individual order
export type Order = {
  _id: string
  buyer: buyer
  products: OrderProduct[] | []
  payment: Payment
  status: OrderStatus
  totalPrice: number
  shipping: Shipping
}

export type OrderState = {
  orders: Order[]
  orderDetails: Order | null
  products: OrderProduct[]
  error: string | null
  isLoading: boolean
  searchBy: number | string
}

const initialState: OrderState = {
  orders: [],
  orderDetails: {} as Order,
  products: [],
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

export const singleOrder = createAsyncThunk(
  'orders/singleOrder',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURl}orders/user-order/${id}`)
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

      .addCase(singleOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload.payload.products
        state.orderDetails = action.payload.payload
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
