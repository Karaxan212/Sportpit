import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createOrderApi, updateOrderApi, deleteOrderApi, fetchOrdersApi } from '../../services/api'

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (userEmail) => {
  const orders = await fetchOrdersApi(userEmail)
  return orders
})

export const createOrder = createAsyncThunk('orders/createOrder', async ({ order, userEmail }) => {
  const created = await createOrderApi(order, userEmail)
  return created
})

export const updateOrder = createAsyncThunk('orders/updateOrder', async ({ id, order, userEmail }) => {
  const updated = await updateOrderApi({ id, order }, userEmail)
  return updated
})

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async ({ id, userEmail }) => {
  await deleteOrderApi(id, userEmail)
  return id
})

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.list.unshift(action.payload)
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.list = state.list.map((order) =>
          order.id === action.payload.id ? action.payload : order,
        )
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.list = state.list.filter((order) => order.id !== action.payload)
      })
  },
})

export default ordersSlice.reducer
