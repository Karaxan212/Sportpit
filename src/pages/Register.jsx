import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser } from '../redux/slices/authSlice'
import { showToast } from '../redux/slices/uiSlice'

export default function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (auth.user) {
      navigate('/profile', { replace: true })
    }
  }, [auth.user, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await dispatch(registerUser({ name, email, password })).unwrap()
      dispatch(showToast('Регистрация прошла успешно, войдите в аккаунт', 'Успех'))
      navigate('/login')
    } catch (error) {
      dispatch(showToast(error.message || 'Ошибка регистрации', 'Ошибка'))
    }
  }

  return (
    <section className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-glow">
      <h1 className="text-3xl font-bold text-white">Создать аккаунт</h1>
      <p className="mt-2 text-slate-400">Заполните данные для регистрации.</p>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <label className="block text-sm font-semibold text-slate-300">
          Имя
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-3xl border border-white/10 bg-black/70 px-4 py-3 text-white outline-none transition focus:border-brand-400"
            required
          />
        </label>
        <label className="block text-sm font-semibold text-slate-300">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-3xl border border-white/10 bg-black/70 px-4 py-3 text-white outline-none transition focus:border-brand-400"
            required
          />
        </label>
        <label className="block text-sm font-semibold text-slate-300">
          Пароль
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-3xl border border-white/10 bg-black/70 px-4 py-3 text-white outline-none transition focus:border-brand-400"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-3xl bg-brand-500 px-6 py-3 text-base font-semibold text-black transition hover:bg-brand-400"
        >
          Зарегистрироваться
        </button>
      </form>
      {auth.error && <p className="mt-4 text-sm text-red-400">{auth.error}</p>}
    </section>
  )
}
