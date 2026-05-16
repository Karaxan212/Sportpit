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

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: initialCart(),
  },
  reducers: {
    addItem(state, action) {
      const existing = state.items.find((item) => item.id === action.payload.id)
      if (existing) {
        existing.quantity += action.payload.quantity || 1
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 })
      }
      saveCart(state.items)
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
      saveCart(state.items)
    },
    updateQuantity(state, action) {
      const item = state.items.find((product) => product.id === action.payload.id)
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity)
      }
      saveCart(state.items)
    },
    clearCart(state) {
      state.items = []
      saveCart(state.items)
    },
  },
})

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
