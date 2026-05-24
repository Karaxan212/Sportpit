import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import AppRouter from './routes/AppRouter'
import Toast from './components/Toast'
import { loadCart, loadUserCart } from './redux/slices/cartSlice'

function App() {
  const dispatch = useDispatch()
  const toast = useSelector((state) => state.ui.toast)
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (user?.email) {
      const userCart = loadUserCart(user.email)
      dispatch(loadCart(userCart))
    }
  }, [user?.email, dispatch])

  return (
    <>
      <AppRouter />
      <Toast message={toast?.message} type={toast?.type} />
    </>
  )
}

export default App
