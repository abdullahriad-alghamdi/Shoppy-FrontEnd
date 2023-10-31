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
  try {
    const { data } = await api.get('/mock/e-commerce/categories.json')
    return data
  } catch (error) {
    console.error("Error: Can't fetch categories.", error)
  }
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

      const updatedCategories = state.categories.map((category) => {
        if (category.id === id) {
          // Create a new category object with the updated name
          return { ...category, name }
        }
        return category
      })

      state.categories = updatedCategories
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
