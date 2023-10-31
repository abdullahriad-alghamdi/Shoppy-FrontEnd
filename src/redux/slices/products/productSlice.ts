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
    const { data } = await api.get('/mock/e-commerce/products.json')
    return data
  } catch (error) {
    console.error("Error: Can't fetch products.", error)
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
      switch (sortValue) {
        case 'name':
          state.products.sort((a, b) => a.name.localeCompare(b.name))
          break
        case 'priceLowToHigh':
          state.products.sort((a, b) => a.price - b.price)
          break
        case 'priceHighToLow':
          state.products.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          state.products.sort((a, b) => b.rating - a.rating)
          break
        default:
          break
      }
    },
    // single product
    findProductById: (state, action) => {
      const id = action.payload
      const foundProduct = state.products.find((product) => product.id === id)
      if (foundProduct) {
        state.singleProduct = foundProduct
      } else {
        state.error = `Product with id ${id} not found.`
      }
    },
    // Categories filter
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
