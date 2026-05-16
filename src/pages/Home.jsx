import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../redux/slices/productsSlice'
import ProductCard from '../components/ProductCard'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function Home() {
  const dispatch = useDispatch()
  const { items, status, error } = useSelector((state) => state.products)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts())
  }, [status, dispatch])

  const featured = items.filter((product) => product.featured).slice(0, 4)
  const popular = items.slice(0, 6)

  return (
    <section className="space-y-10">
      <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-black via-slate-950 to-slate-900 px-6 py-12 shadow-xl shadow-brand-500/10 sm:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-brand-500/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-brand-400">
              Специальное предложение
            </span>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Зарядись энергией с FitFuel.
            </h1>
            <p className="max-w-2xl text-slate-300">
              Лучшие спортивные добавки, восстановление и витамины в тёмном динамичном магазине.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-brand-400">
                Каталог
              </Link>
              <Link to="/orders" className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-brand-500">
                История заказов
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] bg-slate-950/80 p-6 text-slate-300 shadow-2xl shadow-black/30">
            <p className="text-sm uppercase tracking-[0.24em] text-brand-400">FitFuel Акция</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Купи 2 продукта — получи скидку 15%</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Пополняй запас энергии и улучшай восстановление с профессиональными формулами.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-black/60 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Доставка</p>
                <p className="mt-2 text-lg font-semibold text-white">Быстрая доставка</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/60 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Качество</p>
                <p className="mt-2 text-lg font-semibold text-white">Сертифицированные формулы</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-brand-400">Тренды</p>
            <h2 className="text-3xl font-bold text-white">Популярные добавки</h2>
          </div>
          <Link to="/shop" className="text-sm font-semibold text-brand-400 hover:text-brand-200">
            Смотреть каталог
          </Link>
        </div>
        {status === 'loading' ? <LoadingSkeleton count={4} /> : error ? <p className="text-red-400">{error}</p> : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featured.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-brand-400">Твоя подготовка</p>
            <h2 className="text-3xl font-bold text-white">Лучшие спортивные формулы</h2>
          </div>
          <p className="max-w-2xl text-sm text-slate-400">
            Выбирай товары для набора массы, силы, восстановления и здоровья.
          </p>
        </div>
        {status === 'loading' ? <LoadingSkeleton count={6} /> : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {popular.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
