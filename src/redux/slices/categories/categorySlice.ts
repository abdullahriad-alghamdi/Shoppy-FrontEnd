import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'

export type Category = {
  id: number
  name: string
}

export type CategoryState = {
  categories: Category[]
  error: null | string
  isLoading: boolean
}

const initialState: CategoryState = {
  categories: [],
  error: null,
  isLoading: false
}

export const fetchCategories = createAsyncThunk('Categories/fetchData', async () => {
  const response = await api.get('/mock/e-commerce/categories.json')
  const data = response.data
  return data
})
export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload)
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter((category) => category.id !== action.payload)
    },
    updateCategory: (state, action) => {
      const { id, name } = action.payload
      const existingCategory = state.categories.find((category) => category.id === id)
      if (existingCategory) {
        existingCategory.name = name
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Error: Fetching categories rejected.'
      })
  }
})

export const { addCategory, removeCategory, updateCategory } = categorySlice.actions
export default categorySlice.reducer
