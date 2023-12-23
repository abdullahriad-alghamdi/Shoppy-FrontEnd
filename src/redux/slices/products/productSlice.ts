import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios'
import { baseURl } from '../usersList/userSlice'
import { Category } from '../categories/categorySlice'
import { toast } from 'react-toastify'

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
  totalPages: number
}

const initialState: ProductState = {
  products: [],
  error: null,
  isLoading: false,
  searchBy: 0 || '',
  singleProduct: {} as Product,
  totalPages: 0
}

export const fetchAllProducts = createAsyncThunk(
  'Products/fetchAllData',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURl}products/?page=1&limit=4`)

      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const fetchProducts = createAsyncThunk(
  'Products/fetchData',
  async (pagination: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseURl}products/?page=${pagination.page}&limit=${pagination.limit}`
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
      const { data } = await axios.get(`${baseURl}products/${slug}`)
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
      const { data } = await axios.get(`${baseURl}products/?categoryId=${categoryId}`)
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
      const { data } = await axios.post(`${baseURl}products`, FormData)
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
        `${baseURl}products/${updatedProduct.slug}`,
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
      const { data } = await axios.delete(`${baseURl}products/${slug}`)
      return { data, slug }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

//sortProducts
export const sortProducts = createAsyncThunk(
  'Products/sortProducts',
  async (sortValue: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURl}products/?sort=${sortValue}`)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchProducts: (state, action) => {
      state.searchBy = action.payload
    }

    // sortProducts: (state, action) => {
    //   const sortValue = action.payload
    //   switch (sortValue) {
    //     case 'name':
    //       state.products.sort((a, b) => a.title.localeCompare(b.title))
    //       break
    //     case 'priceLowToHigh':
    //       state.products.sort((a, b) => a.price - b.price)
    //       break
    //     case 'priceHighToLow':
    //       state.products.sort((a, b) => b.price - a.price)
    //       break
    //     default:
    //       break
    //   }
    // }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload.payload
        const { totalPages } = action.payload.pagination
        state.totalPages = totalPages
      })

      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload.payload
      })

      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
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

      .addCase(sortProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload.payload
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
          toast.error(action.payload.response.data.errors)
          state.isLoading = false
          state.error = action.payload.response.data.errors
        }
      )
  }
})

export const { searchProducts } = productSlice.actions
export default productSlice.reducer
