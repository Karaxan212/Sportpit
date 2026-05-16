import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { hideToast } from '../redux/slices/uiSlice'

export default function Toast({ message, type }) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => dispatch(hideToast()), 2600)
    return () => clearTimeout(timer)
  }, [message, dispatch])

  if (!message) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-3xl border border-brand-400/40 bg-slate-950/95 px-5 py-4 shadow-glow backdrop-blur-md">
      <p className="text-sm font-semibold text-brand-400">{type || 'Уведомление'}</p>
      <p className="mt-1 text-white">{message}</p>
    </div>
  )
}
