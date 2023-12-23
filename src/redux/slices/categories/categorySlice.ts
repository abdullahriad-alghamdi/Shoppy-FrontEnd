import { createAsyncThunk, createSlice, current, isRejectedWithValue } from '@reduxjs/toolkit'

import api from '../../../api'
import axios, { AxiosError } from 'axios'
import { baseURl } from '../usersList/userSlice'
import { toast } from 'react-toastify'

export type Category = {
  _id: string
  title: string
  slug: string
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
    const { data } = await axios.get(`${baseURl}categories`)
    return data
  } catch (error) {
    console.error("Error: Can't fetch categories.", error)
  }
})

//remove category
export const removeCategory = createAsyncThunk(
  'Categories/removeCategoryBySlug',
  async (slug: string) => {
    try {
      const { data } = await axios.delete(`${baseURl}categories/${slug}`)
      const { message } = data
      return { message, slug }
    } catch (error) {
      console.error("Error: Can't remove category.", error)
    }
  }
)

// add category
export const addCategory = createAsyncThunk(
  'Categories/addCategory',
  async (category: Partial<Category>, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseURl}categories`, category)
      return data
    } catch (error) {
      return error
    }
  }
)

// update category
export const updateCategory = createAsyncThunk(
  'Categories/updateCategory',
  async (category: Partial<Category>, thunkAPI) => {
    try {
      const { data } = await axios.put(`${baseURl}categories/${category.slug}`, category)

      return data
    } catch (error) {
      return error
    }
  }
)

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // updateCategory: (state, action) => {
    // const { id, name } = action.payload
    // const updatedCategories = state.categories.map((category) => {
    //   if (category.id === id) {
    //     return { ...category, name }
    //   }
    //   return category
    // })
    // state.categories = updatedCategories
    // }
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.categories = action.payload.payload
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.categories = state.categories.filter(
          (category) => category.slug !== action.payload?.slug
        )
        toast.success(action.payload?.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true
        })
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.categories.push(action.payload.payload)
        toast.success(action.payload.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true
        })
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false

        const { _id, slug, title } = action.payload.payload
        state.categories = state.categories.map((category) => {
          if (category._id === _id) {
            // Return a new object
            return {
              ...category, // copy the existing category
              title, // replace the name
              slug
            }
          }
          // Leave every other category unchanged
          return category
        })

        toast.success(action.payload.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true
        })
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
          state.error = action.payload
        }
      )
  }
})

export const {} = categorySlice.actions
export default categorySlice.reducer
