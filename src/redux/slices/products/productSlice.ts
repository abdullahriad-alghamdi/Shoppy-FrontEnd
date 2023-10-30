import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'

export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  price: number
  rating: number
}

export type ProductState = {
  products: Product[]
  error: null | string
  isLoading: boolean
  searchBy: number | string
  singleProduct: Product
}

const initialState: ProductState = {
  products: [],
  error: null,
  isLoading: false,
  searchBy: 0 || '',
  singleProduct: {} as Product
}

export const fetchProducts = createAsyncThunk('Products/fetchData', async () => {
  try {
    const response = await api.get('/mock/e-commerce/products.json')
    const data = response.data
    return data
  } catch (error) {
    throw new Error('Error: Fetching products rejected' + error)
  }
})

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchProducts: (state, action) => {
      state.searchBy = action.payload
    },

    sortProducts: (state, action) => {
      const sortValue = action.payload
      if (sortValue === 'name') {
        state.products.sort((a, b) => a.name.localeCompare(b.name))
      } else if (sortValue === 'price') {
        state.products.sort((a, b) => a.id - b.id)
      }
    },

    findProductById: (state, action) => {
      const id = action.payload
      const foundProduct = state.products.find((product) => product.id === id)
      if (foundProduct) {
        state.singleProduct = foundProduct
      }
    },

    filterProducts: (state, action) => {
      const filterValue = action.payload
      if (filterValue === 'all') {
        state.products = state.products
      } else {
        state.products = state.products.filter((product) =>
          product.categories.includes(parseInt(filterValue))
        )
      }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Error: Fetching products was rejected.'
      })
  }
})

export const { filterProducts, findProductById, sortProducts, searchProducts } =
  productSlice.actions
export default productSlice.reducer
