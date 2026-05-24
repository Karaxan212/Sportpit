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

const USERS_STORAGE_KEY = 'fitfuel_users'

const loadUsers = () => {
  try {
    const raw = window.localStorage.getItem(USERS_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const saveUsers = (users) => {
  try {
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
  } catch {
    // ignore
  }
}

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
  await new Promise((resolve) => setTimeout(resolve, 400))
  if (!email || !password) {
    throw new Error('Введите email и пароль')
  }
  const users = loadUsers()
  const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
  if (!found) {
    throw new Error('Неверный email или пароль')
  }
  const { password: _pwd, ...user } = found
  return user
})

export const registerUser = createAsyncThunk('auth/registerUser', async ({ name, email, password }) => {
  await new Promise((resolve) => setTimeout(resolve, 400))
  if (!name || !email || !password) {
    throw new Error('Введите имя, email и пароль')
  }
  const users = loadUsers()
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase())
  if (exists) {
    throw new Error('Пользователь с таким email уже зарегистрирован')
  }
  const newUser = {
    id: users.length ? Math.max(...users.map((u) => u.id || 0)) + 1 : 1,
    name,
    email,
    password,
    phone: '+7 000 000-00-00',
    address: '',
  }
  const updated = [newUser, ...users]
  saveUsers(updated)
  const { password: _pwd, ...user } = newUser
  return user
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
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.error = null
        // Do not auto-login after registration; user must sign in
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
