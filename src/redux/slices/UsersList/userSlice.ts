import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// import api from '../../../api'
import axios from 'axios'
import { toast } from 'react-toastify'

export const baseURl = 'http://localhost:8080/'

export type User = {
  _id: string
  name: string
  username: string
  slug: string
  email: string
  password: string
  image?: string
  orders: []
  address: string
  phone: string
  isAdmin: boolean
  isBanned: boolean
}
export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  searchBy: string
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

// Get users
export const fetchUsers = createAsyncThunk('users/fetchData', async () => {
  try {
    const { data } = await axios.get(`${baseURl}users`)
    return data
  } catch (error) {
    console.error("Error: Can't fetch users.", error)
  }
})

// Delete user
export const deleteUser = createAsyncThunk('users/deleteUser', async (slug: string) => {
  try {
    const { data } = await axios.delete(`${baseURl}users/${slug}`)
    const { message } = data
    return { slug, message }
  } catch (error) {
    console.error("Error: Can't fetch users.", error)
  }
})

// Ban user

// Grant a Role
export const grantRole = createAsyncThunk('users/grantRole', async (id: string) => {
  try {
    const { data } = await axios.put(`${baseURl}users/role/${id}`)
    const { message } = data

    return { id, message }
  } catch (error) {
    console.error("Error: Can't fetch users.", error)
  }
})

// Ban user
export const banStatus = createAsyncThunk('users/banUser', async (id: string) => {
  try {
    const { data } = await axios.put(`${baseURl}users/banStatus/${id}`)
    const { message } = data

    return { id, message }
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
      if (sortValue === 'name') {
        state.users.sort((a, b) => a.name.localeCompare(b.name))
      }
    },

    // deleteUser: (state, action) => {
    //   const id = action.payload
    //   // Deleting user
    //   state.users = state.users.filter((user) => user._id !== id)
    //   localStorage.setItem('users', JSON.stringify({ users: state.users }))
    // },

    register: (state, action) => {
      const { _id, name, username, slug, email, password, image, address, phone } = action.payload

      // Adding new user
      state.users.push({
        _id,
        name,
        username,
        slug,
        email,
        password,
        image,
        address,
        phone,
        isAdmin: false,
        isBanned: false,
        orders: []
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
      const { _id, name, email, password } = action.payload
      const userIndex = state.users.findIndex((user) => user._id === _id)

      // Updating user
      state.users[userIndex].name = `${name}`
      state.users[userIndex].email = email
      state.users[userIndex].password = password

      localStorage.setItem('users', JSON.stringify({ users: state.users }))
    },

    editInfoAdmin: (state, action) => {
      const { name } = action.payload
      const userIndex = state.users.findIndex((user) => user._id === action.payload._id)

      // Updating user
      state.users[userIndex].name = `${name}`

      localStorage.setItem('users', JSON.stringify({ users: state.users }))
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload.payload
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = state.users.filter((user) => user.slug !== action.payload?.slug)
        toast.success(action.payload?.message)
      })

      .addCase(grantRole.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = state.users.map((user) => {
          if (user._id === action.payload?.id) {
            user.isAdmin = !user.isAdmin
          }
          return user
        })
        toast.success(action.payload?.message)
      })

      .addCase(banStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = state.users.map((user) => {
          if (user._id === action.payload?.id) {
            user.isBanned = !user.isBanned
          }
          return user
        })
        toast.success(action.payload?.message)
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
          state.error = action.error.message || 'Error: Fetching users rejected.'
        }
      )
  }
})

export const {
  sortUsers,
  searchUsers,
  // deleteUser,
  register,
  logout,
  login,
  editInfo,
  editInfoAdmin
} = userSlice.actions
export default userSlice.reducer
