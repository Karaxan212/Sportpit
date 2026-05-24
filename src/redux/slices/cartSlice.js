import { createSlice } from '@reduxjs/toolkit'

const initialCart = () => {
  try {
    const persisted = window.localStorage.getItem('fitfuel_cart')
    return persisted ? JSON.parse(persisted) : []
  } catch {
    return []
  }
}

const saveCart = (items) => {
  try {
    window.localStorage.setItem('fitfuel_cart', JSON.stringify(items))
  } catch {
    // ignore
  }
}

const CART_KEY_PREFIX = 'fitfuel_cart_'

const loadUserCart = (userEmail) => {
  if (!userEmail) {
    return initialCart()
  }
  try {
    const key = `${CART_KEY_PREFIX}${userEmail}`
    const persisted = window.localStorage.getItem(key)
    return persisted ? JSON.parse(persisted) : []
  } catch {
    return []
  }
}

const saveUserCart = (items, userEmail) => {
  if (!userEmail) return
  try {
    const key = `${CART_KEY_PREFIX}${userEmail}`
    window.localStorage.setItem(key, JSON.stringify(items))
  } catch {
    // ignore
  }
}

const getCurrentUserEmail = () => {
  try {
    const raw = window.localStorage.getItem('fitfuel_auth')
    const auth = raw ? JSON.parse(raw) : {}
    return auth.user?.email || null
  } catch {
    return null
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: initialCart(),
  },
  reducers: {
    loadCart(state, action) {
      state.items = action.payload || []
    },
    addItem(state, action) {
      const existing = state.items.find((item) => item.id === action.payload.id)
      if (existing) {
        existing.quantity += action.payload.quantity || 1
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 })
      }
      const userEmail = getCurrentUserEmail()
      if (userEmail) {
        saveUserCart(state.items, userEmail)
      } else {
        saveCart(state.items)
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
      const userEmail = getCurrentUserEmail()
      if (userEmail) {
        saveUserCart(state.items, userEmail)
      } else {
        saveCart(state.items)
      }
    },
    updateQuantity(state, action) {
      const item = state.items.find((product) => product.id === action.payload.id)
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity)
      }
      const userEmail = getCurrentUserEmail()
      if (userEmail) {
        saveUserCart(state.items, userEmail)
      } else {
        saveCart(state.items)
      }
    },
    clearCart(state) {
      state.items = []
      const userEmail = getCurrentUserEmail()
      if (userEmail) {
        saveUserCart(state.items, userEmail)
      } else {
        saveCart(state.items)
      }
    },
  },
})

export const { addItem, removeItem, updateQuantity, clearCart, loadCart } = cartSlice.actions
export { loadUserCart, saveUserCart, CART_KEY_PREFIX }
export default cartSlice.reducer
