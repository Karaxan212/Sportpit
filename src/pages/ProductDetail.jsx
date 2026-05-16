import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../redux/slices/productsSlice'
import { addItem } from '../redux/slices/cartSlice'
import { showToast } from '../redux/slices/uiSlice'
import LoadingSkeleton from '../components/LoadingSkeleton'

const fallbackImage = 'https://via.placeholder.com/500x350?text=No+Image'

export default function ProductDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { items, status, error } = useSelector((state) => state.products)
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts())
  }, [status, dispatch])

  const product = items.find((item) => String(item.id) === id)
  const images = product?.images?.length ? product.images : [product?.image]

  const handleAdd = () => {
    if (!product) return
    dispatch(addItem({ ...product, quantity }))
    dispatch(showToast(`Товар ${product.title} добавлен в корзину`, 'Добавлено'))
    setQuantity(1)
  }

  if (status === 'loading') {
    return <LoadingSkeleton count={1} />
  }

  if (error) {
    return <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-red-200">Ошибка загрузки товара: {error}</div>
  }

  if (!product) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-10 text-center text-slate-300">
        <h2 className="text-2xl font-semibold text-white">Товар не найден</h2>
        <p className="mt-3 text-sm text-slate-400">Этот товар больше недоступен или не существует.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
        <div className="mx-auto mb-8 overflow-hidden rounded-[2rem] bg-slate-900">
          <img
            src={images[activeImageIndex] || fallbackImage}
            alt={product.title}
            onError={(event) => { event.currentTarget.src = fallbackImage }}
            className="mx-auto h-[28rem] max-h-[650px] w-full rounded-[2rem] object-contain"
          />
        </div>
        {images.length > 1 && (
          <div className="mb-8 flex flex-wrap gap-3 rounded-3xl border border-white/10 bg-slate-950/80 p-3">
            {images.map((src, index) => (
              <button
                key={`${src}-${index}`}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                className={`h-20 w-20 overflow-hidden rounded-3xl border bg-slate-950/80 transition focus:outline-none ${index === activeImageIndex ? 'border-brand-500 bg-brand-500/10 ring-2 ring-brand-500/40' : 'border-white/10 hover:border-brand-400 hover:bg-white/5'}`}
              >
                <img
                  src={src || fallbackImage}
                  alt={`${product.title} preview ${index + 1}`}
                  onError={(event) => { event.currentTarget.src = fallbackImage }}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">{product.title}</h1>
          <p className="text-sm uppercase tracking-[0.25em] text-brand-400">{product.category}</p>
          <p className="max-w-3xl text-slate-300">{product.description}</p>
        </div>
      </div>
      <div className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Детали</p>
          <div className="flex items-center justify-between rounded-3xl bg-black/60 p-4 text-white/90">
            <span className="font-semibold">Цена</span>
            <span className="text-2xl font-bold text-white">${product.price.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between rounded-3xl bg-black/60 p-4 text-slate-300">
            <span>Рейтинг</span>
            <span>{product.rating?.rate?.toFixed(1)} ★</span>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/60 p-5">
          <label className="block text-sm font-semibold text-slate-300">Количество</label>
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="rounded-full bg-white/5 px-4 py-2 text-xl font-bold text-white hover:bg-white/10"
            >
              -
            </button>
            <span className="min-w-[3rem] text-center text-xl font-semibold text-white">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="rounded-full bg-white/5 px-4 py-2 text-xl font-bold text-white hover:bg-white/10"
            >
              +
            </button>
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="w-full rounded-3xl bg-brand-500 px-6 py-4 text-lg font-semibold text-black transition hover:bg-brand-400"
        >
          В корзину
        </button>
      </div>
    </div>
  )
}
