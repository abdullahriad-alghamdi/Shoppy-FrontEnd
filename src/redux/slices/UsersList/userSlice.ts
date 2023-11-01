import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}
export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  searchBy: number | string
}

const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  searchBy: 0 || ''
}

export const fetchUsers = createAsyncThunk('users/fetchData', async () => {
  try {
    const { data } = await api.get('/mock/e-commerce/users.json')
    return data
  } catch (error) {
    console.error("Error: Can't fetch users.", error)
  }
})

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    searchUsers: (state, action) => {
      state.searchBy = action.payload
    },

    sortUsers: (state, action) => {
      const sortValue = action.payload
      if (sortValue === 'firstName') {
        state.users.sort((a, b) => a.firstName.localeCompare(b.firstName))
      } else if (sortValue === 'lastName') {
        state.users.sort((a, b) => a.lastName.localeCompare(b.lastName))
      }
    },

    deleteUser: (state, action) => {
      const { id } = action.payload
      state.users = state.users.filter((user) => user.id !== id)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Error: Fetching users rejected.'
      })
  }
})

export const { sortUsers, searchUsers, deleteUser } = userSlice.actions
export default userSlice.reducer
