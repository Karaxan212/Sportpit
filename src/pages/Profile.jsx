import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrders, deleteOrder, updateOrder } from '../redux/slices/ordersSlice'
import { showToast } from '../redux/slices/uiSlice'

export default function Profile() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const { list, status, error } = useSelector((state) => state.orders)
  const [name, setName] = useState(auth.user?.name || '')
  const [phone, setPhone] = useState(auth.user?.phone || '')
  const [address, setAddress] = useState(auth.user?.address || '')

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

  const handleSave = (e) => {
    e.preventDefault()
    dispatch(showToast('Профиль обновлён', 'Сохранено'))
  }

  return (
    <section className="space-y-8">
      <div className="rounded-[2.5rem] border border-white/10 bg-slate-950/80 p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-white">Личный кабинет</h1>
        <p className="mt-2 text-slate-400">Управляйте профилем, смотрите историю заказов и обновляйте данные.</p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_1.4fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
          <h2 className="text-xl font-semibold text-white">Профиль</h2>
          <form className="mt-6 space-y-4" onSubmit={handleSave}>
            <label className="block text-sm text-slate-300">
              Имя
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-black/70 px-4 py-3 text-white outline-none focus:border-brand-400"
              />
            </label>
            <label className="block text-sm text-slate-300">
              Телефон
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-black/70 px-4 py-3 text-white outline-none focus:border-brand-400"
              />
            </label>
            <label className="block text-sm text-slate-300">
              Адрес
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-black/70 px-4 py-3 text-white outline-none focus:border-brand-400"
                rows={4}
              />
            </label>
            <button
              type="submit"
              className="rounded-3xl bg-brand-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-brand-400"
            >
              Сохранить профиль
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
            <h2 className="text-xl font-semibold text-white">Контакты</h2>
            <p className="mt-4 text-slate-300">Имя: {auth.user?.name}</p>
            <p className="mt-2 text-slate-300">Email: {auth.user?.email}</p>
            <p className="mt-2 text-slate-300">Телефон: {auth.user?.phone}</p>
            <p className="mt-2 text-slate-300">Адрес: {auth.user?.address}</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
            <h2 className="text-xl font-semibold text-white">История заказов</h2>
            {status === 'loading' ? (
              <p className="mt-4 text-slate-300">Загрузка заказов...</p>
            ) : error ? (
              <p className="mt-4 text-red-400">Ошибка: {error}</p>
            ) : list.length === 0 ? (
              <p className="mt-4 text-slate-300">Пока нет заказов.</p>
            ) : (
              <ul className="mt-4 space-y-4">
                {list.map((order) => (
                  <li key={order.id} className="rounded-3xl bg-black/60 p-4 text-slate-300">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm uppercase tracking-[0.2em] text-brand-400">Заказ #{order.id}</div>
                        <div className="mt-1 text-white">{new Date(order.date || Date.now()).toLocaleDateString()}</div>
                      </div>
                      <button
                        onClick={() => handleCancel(order.id)}
                        className="rounded-2xl bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
                      >
                        Отменить
                      </button>
                    </div>
                    <div className="mt-3 text-sm text-slate-400">Статус: {order.status || 'обработка'}</div>
                    <div className="mt-3 text-sm text-slate-300">
                      Товары: {order.products?.map((item) => `${item.productId}×${item.quantity}`).join(', ')}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
