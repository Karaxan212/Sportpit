import { useDispatch } from 'react-redux'
import { removeItem, updateQuantity } from '../redux/slices/cartSlice'

export default function CartItem({ item }) {
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/80 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.title}
          onError={(event) => { event.currentTarget.src = '/images/protein-1.svg' }}
          className="h-24 w-24 rounded-3xl object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
          <p className="text-sm text-slate-400">{item.category}</p>
          <p className="mt-2 text-sm text-brand-400">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="rounded-full bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
        >
          -
        </button>
        <span className="min-w-[2rem] text-center text-sm font-semibold">{item.quantity}</span>
        <button
          className="rounded-full bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
        >
          +
        </button>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="rounded-2xl bg-brand-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-brand-400"
          onClick={() => dispatch(removeItem(item.id))}
        >
          Remove
        </button>
        <span className="text-sm text-slate-400">Total ${ (item.price * item.quantity).toFixed(2) }</span>
      </div>
    </div>
  )
}
