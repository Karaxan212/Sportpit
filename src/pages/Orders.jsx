import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrders, deleteOrder, updateOrder } from '../redux/slices/ordersSlice'
import { showToast } from '../redux/slices/uiSlice'

export default function Orders() {
  const dispatch = useDispatch()
  const { list, status, error } = useSelector((state) => state.orders)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchOrders())
  }, [status, dispatch])

  const handleCancel = async (id) => {
    try {
      await dispatch(deleteOrder(id)).unwrap()
      dispatch(showToast('Заказ отменён', 'Готово'))
    } catch {
      dispatch(showToast('Не удалось отменить заказ', 'Ошибка'))
    }
  }

  const handleMarkComplete = async (order) => {
    try {
      const updatedOrder = { ...order, status: 'completed' }
      await dispatch(updateOrder({ id: order.id, order: updatedOrder })).unwrap()
      dispatch(showToast('Статус заказа обновлён', 'Готово'))
    } catch {
      dispatch(showToast('Не удалось обновить заказ', 'Ошибка'))
    }
  }

  return (
    <section className="space-y-8">
      <div className="rounded-[2.5rem] border border-white/10 bg-slate-950/80 p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-white">История заказов</h1>
        <p className="mt-2 text-slate-400">Смотрите свои заказы, отменяйте или отмечайте как выполненные.</p>
      </div>

      {status === 'loading' ? (
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-10 text-center text-slate-300">
          <p>Загрузка заказов...</p>
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-200">{error}</div>
      ) : list.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-10 text-center text-slate-300">
          <h2 className="text-2xl font-semibold text-white">Заказы отсутствуют</h2>
          <p className="mt-3 text-sm text-slate-400">Оформите заказ в корзине, чтобы он появился здесь.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {list.map((order) => (
            <div key={order.id} className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-glow">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-brand-400">Заказ #{order.id}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{new Date(order.date || Date.now()).toLocaleDateString()}</p>
                </div>
                <div className="space-x-3">
                  <button
                    className="rounded-2xl bg-brand-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-brand-400"
                    onClick={() => handleMarkComplete(order)}
                  >
                    Завершить
                  </button>
                  <button
                    className="rounded-2xl bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                    onClick={() => handleCancel(order.id)}
                  >
                    Отменить
                  </button>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-black/60 p-4 text-slate-300">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Статус заказа</p>
                  <p className="mt-2 text-lg font-semibold text-white">{order.status || 'в обработке'}</p>
                </div>
                <div className="rounded-3xl bg-black/60 p-4 text-slate-300">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Товары</p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-200">
                    {order.products?.slice(0, 5).map((product, idx) => (
                      <li key={idx} className="flex items-center justify-between">
                        <span>Товар {product.productId}</span>
                        <span className="text-brand-400">{product.quantity}×</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
