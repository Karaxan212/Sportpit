import { useSelector } from 'react-redux'
import AppRouter from './routes/AppRouter'
import Toast from './components/Toast'

function App() {
  const toast = useSelector((state) => state.ui.toast)

  return (
    <>
      <AppRouter />
      <Toast message={toast?.message} type={toast?.type} />
    </>
  )
}

export default App
