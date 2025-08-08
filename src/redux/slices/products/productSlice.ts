import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios'
import { toast } from 'react-toastify'
import { Category } from '../categories/categorySlice'
import { baseURl } from '../usersList/userSlice'

export type Product = {
  _id: string
  title: string
  slug: string
  description: string
  price: number
  quantity: number
  countInStock: number
  sold: number
  image: string
  category: Category
}

export type ProductState = {
  products: Product[]
  error: string | null
  isLoading: boolean
  searchBy: number | string
  singleProduct: Product
  pagination: {
    totalPages: number
    currentPage: number
    totalProducts: number
  }
}

type queries = {
  page: number
  limit: number
  sortValue: string
  categoryID: string
  searchTerm: string
}

const initialState: ProductState = {
  products: [],
  error: null,
  isLoading: false,
  searchBy: '',
  singleProduct: {} as Product,
  pagination: {
    totalPages: 0,
    currentPage: 0,
    totalProducts: 0
  }
}

// fetch all products
export const fetchAllProducts = createAsyncThunk(
  'Products/fetchAllData',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURl}/products/?page=1&limit=4`)

      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

// fetch products with queries
export const fetchProducts = createAsyncThunk(
  'Products/fetchData',
  async (pagination: Partial<queries>, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseURl}/products/?page=${pagination.page}&limit=${pagination.limit}&categoryId=${pagination.categoryID}&search=${pagination.searchTerm}&sort=${pagination.sortValue}`
      )

      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

// fetch single product by id
export const findProductById = createAsyncThunk(
  'Products/fetchSingleProduct',
  async (slug: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURl}/products/${slug}`)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

// filter products by categoryID
export const fetchProductsByCategory = createAsyncThunk(
  'Products/fetchDataByCategory',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURl}/products/?categoryId=${categoryId}`)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

// add product
export const addProduct = createAsyncThunk(
  'Products/addProduct',
  async (FormData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseURl}/products`, FormData)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

// Update product
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (updatedProduct: { formData: FormData; slug: string }, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `${baseURl}/products/${updatedProduct.slug}`,
        updatedProduct.formData
      )
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// Delete product by slug
export const removeProduct = createAsyncThunk(
  'Products/deleteProduct',
  async (slug: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${baseURl}/products/${slug}`)
      return { data, slug }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload.payload
        state.pagination = action.payload.pagination
        state.searchBy = action.payload.searchBy
      })

      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload.payload
      })

      .addCase(findProductById.fulfilled, (state, action) => {
        state.isLoading = false
        state.singleProduct = action.payload.payload
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.products.push(action.payload.payload)
        toast.success(action.payload.message)
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.products.findIndex(
          (product) => product._id === action.payload.payload._id
        )
        state.products[index] = action.payload.payload
        toast.success(action.payload.message)
      })

      .addCase(removeProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = state.products.filter((product) => product.slug !== action.payload.slug)
        toast.success(action.payload.data.message)
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
          state.error = action.payload.response.data.errors
          toast.error(state.error)
        }
      )
  }
})

export default productSlice.reducer
