import { useEffect } from 'react'
import Router from './routes/Router'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './redux/store'

import { fetchProducts } from './redux/slices/products/productSlice'
import { fetchCategories } from './redux/slices/categories/categorySlice'
import { fetchOrders } from './redux/slices/orders/orderSlice'
import { fetchUsers } from './redux/slices/usersList/userSlice'

import { NavBar } from './components/pages/Home/NavBar'
import Footer from './components/pages/Home/Footer'
import { ToastContainer } from 'react-toastify'

function App() {
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
    dispatch(fetchOrders())
    dispatch(fetchUsers())
  }, [dispatch])
  return (
    <div className="app">
      <NavBar />
      <Router />
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App
