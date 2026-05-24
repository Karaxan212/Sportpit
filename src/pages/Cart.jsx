import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../redux/slices/cartSlice'
import { createOrder } from '../redux/slices/ordersSlice'
import { showToast } from '../redux/slices/uiSlice'
import CartItem from '../components/CartItem'

export default function Cart() {
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.cart)
  const user = useSelector((state) => state.auth.user)
  const cartTotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  )

  const handleCheckout = async () => {
    if (items.length === 0) return
    if (!user) {
      dispatch(showToast('Пожалуйста, войдите в аккаунт перед оформлением заказа', 'Предупреждение'))
      return
    }

    const orderPayload = {
      userEmail: user.email,
      date: new Date().toISOString(),
      products: items.map((item) => ({ productId: item.id, quantity: item.quantity })),
    }

    try {
      await dispatch(createOrder({ order: orderPayload, userEmail: user.email })).unwrap()
      dispatch(clearCart())
      dispatch(showToast('Заказ успешно создан!', 'Успех'))
    } catch (err) {
      dispatch(showToast('Не удалось оформить заказ. Попробуйте снова.', 'Ошибка'))
    }
  }

  return (
    <section className="space-y-8">
      <div className="rounded-[2.5rem] border border-white/10 bg-slate-950/80 p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-white">Корзина</h1>
        <p className="mt-2 text-slate-400">Проверьте товары, измените количество и оформите заказ.</p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-10 text-center text-slate-300">
          <h2 className="text-2xl font-semibold text-white">Корзина пуста</h2>
          <p className="mt-3 text-sm text-slate-400">Добавьте товары, чтобы начать сборку вашей программы.</p>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.5fr_0.7fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
            <h2 className="text-xl font-semibold text-white">Итоги заказа</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-slate-300">
                <span>Товаров</span>
                <span>{items.length}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Сумма</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="rounded-3xl bg-black/60 p-4 text-slate-300">
                Доставка и налоги рассчитываются на странице оформления.
              </div>
              <button
                onClick={handleCheckout}
                className="w-full rounded-3xl bg-brand-500 px-5 py-4 text-lg font-semibold text-black transition hover:bg-brand-400"
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
