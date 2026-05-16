import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts, setCategory, setSearch } from '../redux/slices/productsSlice'
import { categories } from '../utils/categories'
import ProductCard from '../components/ProductCard'
import Filters from '../components/Filters'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function Shop() {
  const dispatch = useDispatch()
  const { items, status, error, category, search } = useSelector((state) => state.products)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts())
  }, [status, dispatch])

  const filteredItems = items.filter((product) => {
    const matchesCategory = category === 'all' || product.category.toLowerCase() === category.toLowerCase()
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section className="space-y-8">
      <div className="rounded-[2.5rem] border border-white/10 bg-slate-950/80 p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-white">Каталог спортивного питания</h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          Поиск по названию, фильтрация по категориям и лучшие добавки для тренировок и восстановления.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[320px_1fr]">
        <Filters
          selectedCategory={category}
          search={search}
          onSearch={(value) => dispatch(setSearch(value))}
          onSelectCategory={(value) => dispatch(setCategory(value))}
        />

        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-black/70 p-5 text-slate-300">
            <span className="text-sm font-semibold">Доступно товаров: {filteredItems.length}</span>
            <span className="text-sm text-slate-400">
              Категория: {category === 'all' ? 'Все' : categories.find((cat) => cat.id === category)?.label || category}
            </span>
          </div>

          {status === 'loading' ? (
            <LoadingSkeleton count={6} />
          ) : error ? (
            <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-200">Ошибка загрузки товаров: {error}</div>
          ) : filteredItems.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-8 text-center text-slate-300">
              <p className="text-lg font-semibold text-white">Нет товаров по вашему запросу.</p>
              <p className="mt-2 text-sm text-slate-400">Попробуйте изменить ключевые слова или категорию.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
