import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProductsFromApi } from '../../services/api'

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const products = await fetchProductsFromApi()
  return products
})

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    category: 'all',
    search: '',
  },
  reducers: {
    setCategory(state, action) {
      state.category = action.payload
    },
    setSearch(state, action) {
      state.search = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { setCategory, setSearch } = productsSlice.actions
export default productsSlice.reducer
