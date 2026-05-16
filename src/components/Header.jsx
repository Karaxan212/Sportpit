import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/slices/authSlice'

export default function Header() {
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.cart)
  const user = useSelector((state) => state.auth.user)
  const location = useLocation()

  const navLinks = [
    { to: '/', label: 'Главная' },
    { to: '/shop', label: 'Каталог' },
    { to: '/cart', label: 'Корзина' },
    { to: '/orders', label: 'Заказы' },
    ...(user ? [{ to: '/profile', label: 'Профиль' }] : []),
  ]

  return (
    <header className="border-b border-white/10 bg-black/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold uppercase tracking-[0.3em] text-brand-400">
          <span className="inline-block h-10 w-10 rounded-full bg-brand-400/20 border border-brand-400 shadow-glow"></span>
          FitFuel
        </Link>
        <nav className="hidden md:flex items-center gap-4 text-sm text-slate-300">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-md transition ${location.pathname === link.to ? 'bg-brand-500 text-black' : 'hover:bg-white/10'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-full bg-white/5 px-3 py-2 text-sm text-slate-300">
            Корзина: <span className="font-semibold text-white">{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </div>
          <Link to="/cart" className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-brand-400">
            Оформить
          </Link>
          {user ? (
            <button
              onClick={() => dispatch(logout())}
              className="rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            >
              Выйти
            </button>
          ) : (
            <Link to="/login" className="rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10">
              Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
