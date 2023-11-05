import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
  role: string
}
export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  searchBy: number | string
  isLogin: boolean
  userData: null | User
  userExist: boolean
}

// This is get data from local storage
const data =
  localStorage.getItem('loginData') !== null
    ? JSON.parse(String(localStorage.getItem('loginData')))
    : []

// This is get data from local storage

const usersList =
  localStorage.getItem('users') !== null ? JSON.parse(String(localStorage.getItem('users'))) : []

const initialState: UserState = {
  users: usersList.users || [],
  error: null,
  isLoading: false,
  searchBy: 0 || '',
  isLogin: data.isLogin,
  userData: data.userData,
  userExist: false
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
      // Sorting users by first name or last name
      if (sortValue === 'firstName') {
        state.users.sort((a, b) => a.firstName.localeCompare(b.firstName))
      } else if (sortValue === 'lastName') {
        state.users.sort((a, b) => a.lastName.localeCompare(b.lastName))
      }
    },

    deleteUser: (state, action) => {
      const id = Number(action.payload)
      // Deleting user
      state.users = state.users.filter((user) => user.id !== id)
      localStorage.setItem('users', JSON.stringify({ users: state.users }))
    },

    register: (state, action) => {
      const { id, firstName, lastName, email, password, role, passwordConfirmation } =
        action.payload

      // Adding new user
      state.users.push({
        id,
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation,
        role
      })

      // Setting new user to local storage
      localStorage.setItem('users', JSON.stringify({ users: state.users }))
    },

    login: (state, action) => {
      state.isLogin = true
      state.userData = action.payload

      // Setting login data to local storage
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLogin: state.isLogin,
          userData: state.userData
        })
      )
    },

    logout: (state) => {
      state.isLogin = false
      state.userData = null

      // Resting login data in the local storage
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLogin: state.isLogin,
          userData: state.userData
        })
      )
    },

    editInfo: (state, action) => {
      const { id, firstName, lastName, email, password } = action.payload
      const userIndex = state.users.findIndex((user) => user.id === id)

      // Updating user
      state.users[userIndex].firstName = firstName
      state.users[userIndex].lastName = lastName
      state.users[userIndex].email = email
      state.users[userIndex].password = password

      localStorage.setItem('users', JSON.stringify({ users: state.users }))
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

export const { sortUsers, searchUsers, deleteUser, register, logout, login, editInfo } =
  userSlice.actions
export default userSlice.reducer
