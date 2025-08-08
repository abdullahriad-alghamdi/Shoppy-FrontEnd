import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

export const baseURl = import.meta.env.VITE_BACKEND_URL

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
  userData: User | null
  userExist: boolean
}

const data =
  localStorage.getItem('loginData') !== null
    ? JSON.parse(String(localStorage.getItem('loginData')))
    : []

const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  searchBy: 0 || '',
  isLogin: data.isLogin,
  userData: data.userData,
  userExist: false
}

// Get users
export const fetchUsers = createAsyncThunk('users/fetchData', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(`${baseURl}users`)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

// Delete user
export const deleteUser = createAsyncThunk('users/deleteUser', async (slug: string, thunkAPI) => {
  try {
    const { data } = await axios.delete(`${baseURl}users/${slug}`)
    const { message } = data
    return { slug, message }
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

// Grant a Role
export const grantRole = createAsyncThunk('users/grantRole', async (id: string, thunkAPI) => {
  try {
    const { data } = await axios.put(`${baseURl}users/role/${id}`)
    const { message } = data

    return { id, message }
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

// Ban unban user
export const banStatus = createAsyncThunk('users/banUser', async (id: string, thunkAPI) => {
  try {
    const { data } = await axios.put(`${baseURl}users/banStatus/${id}`)
    const { message } = data

    return { id, message }
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

// Login user
export const loginUser = createAsyncThunk(
  'users/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${baseURl}auth/login`, { email, password })
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

//Logout user
export const logoutUser = createAsyncThunk('users/logout', async (_, thunkAPI) => {
  try {
    const { data } = await axios.post(`${baseURl}auth/logout`)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

// register user
export const registerUser = createAsyncThunk(
  'users/register',
  async (formData: FormData, thunkAPI) => {
    try {
      const { data } = await axios.post(`${baseURl}users/register`, formData)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

//activate user
export const activateUser = createAsyncThunk('users/activate', async (token: string, thunkAPI) => {
  try {
    const { data } = await axios.post(`${baseURl}users/activate`, { token })
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

//forgot password
export const forgotPassword = createAsyncThunk(
  'users/forgotPassword',
  async (email: string, thunkAPI) => {
    try {
      const { data } = await axios.post(`${baseURl}users/forgot-password`, { email })
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

//reset password
export const resetPassword = createAsyncThunk(
  'users/resetPassword',
  async ({ token, newPassword }: { token: string; newPassword: string }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${baseURl}users/reset-password`, { token, newPassword })
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const editInfo = createAsyncThunk(
  'users/editInfo',
  async (info: { _id: string; formData: FormData }, thunkAPI) => {
    try {
      const { data } = await axios.put(`${baseURl}users/updateMe/${info._id}`, info.formData)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// update user profile

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

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLogin = true
        state.userData = action.payload?.payload

        // Setting login data to local storage
        localStorage.setItem(
          'loginData',
          JSON.stringify({
            isLogin: state.isLogin,
            userData: state.userData
          })
        )
        toast.success(action.payload?.message)
      })

      .addCase(logoutUser.fulfilled, (state, action) => {
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
        toast.success(action.payload?.message)
      })

      .addCase(registerUser.fulfilled, (_, action) => {
        toast.success(action.payload?.message)
      })

      .addCase(activateUser.fulfilled, (state, action) => {
        state.users.push(action.payload?.payload)
        toast.success(action.payload?.message)
      })

      .addCase(forgotPassword.fulfilled, (_, action) => {
        toast.success(action.payload?.message)
      })

      .addCase(resetPassword.fulfilled, (_, action) => {
        toast.success(action.payload?.message)
      })

      .addCase(editInfo.fulfilled, (state, action) => {
        state.userData = action.payload?.payload
        // Updating local storage
        localStorage.setItem(
          'loginData',
          JSON.stringify({
            isLogin: state.isLogin,
            userData: state.userData
          })
        )

        state.users = state.users.map((user) => {
          if (user._id === action.payload?.payload._id) {
            user = action.payload?.payload
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
          state.error = action.payload.response.data.errors
          toast.error(state.error)
        }
      )
  }
})

export const { sortUsers, searchUsers } = userSlice.actions
export default userSlice.reducer
