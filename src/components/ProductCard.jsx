import { useState } from 'react'
import { Link } from 'react-router-dom'

const fallbackImage = 'https://via.placeholder.com/500x350?text=No+Image'

export default function ProductCard({ product }) {
  const images = product.images?.length ? product.images : [product.image]
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const imageSrc = images[activeImageIndex] || fallbackImage

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-brand-500">
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <div className="relative mb-4 overflow-hidden rounded-3xl bg-slate-900">
            <img
              src={imageSrc}
              alt={product.title}
              onError={(event) => { event.currentTarget.src = fallbackImage }}
              className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        </Link>
        {images.length > 1 && (
          <div className="mb-4 flex items-center gap-2 overflow-x-auto rounded-3xl border border-white/10 bg-slate-950/80 p-2">
            {images.slice(0, 4).map((src, index) => (
              <button
                key={`${src}-${index}`}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                className={`h-16 w-16 shrink-0 overflow-hidden rounded-3xl border bg-slate-950/80 transition focus:outline-none ${index === activeImageIndex ? 'border-brand-500 bg-brand-500/10 ring-2 ring-brand-500/40' : 'border-white/10 hover:border-brand-400 hover:bg-white/5'}`}
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
        <Link to={`/product/${product.id}`} className="block">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-brand-400">
              <span>{product.category}</span>
              <span>{product.rating?.rate?.toFixed(1)}★</span>
            </div>
            <h3 className="min-h-[3rem] text-lg font-semibold leading-snug text-white">{product.title}</h3>
            <p className="min-h-[3rem] text-sm text-slate-400">{product.description.slice(0, 80)}...</p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xl font-semibold text-white">${product.price.toFixed(2)}</span>
              <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold uppercase text-black">Купить</span>
            </div>
          </div>
        </Link>
      </div>
    </article>
  )
}
