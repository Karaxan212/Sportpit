import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const loadAuth = () => {
  try {
    const raw = window.localStorage.getItem('fitfuel_auth')
    return raw ? JSON.parse(raw) : { user: null, status: 'idle', error: null }
  } catch {
    return { user: null, status: 'idle', error: null }
  }
}

const persistAuth = (state) => {
  try {
    window.localStorage.setItem('fitfuel_auth', JSON.stringify({ user: state.user }))
  } catch {
    // ignore
  }
}

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
  await new Promise((resolve) => setTimeout(resolve, 400))
  if (!email || !password) {
    throw new Error('Введите email и пароль')
  }
  return {
    name: 'Иван Иванов',
    email,
    phone: '+7 999 123-45-67',
    address: 'Москва, Россия',
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuth(),
  reducers: {
    logout(state) {
      state.user = null
      state.error = null
      persistAuth(state)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
        state.error = null
        persistAuth(state)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
