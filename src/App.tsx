import { useEffect } from 'react'
import Router from './routes/Router'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './redux/store'

import { fetchProducts } from './redux/slices/Products/productSlice'
import { fetchCategories } from './redux/slices/Categories/categorySlice'
import { fetchOrders } from './redux/slices/Orders/orderSlice'
import { fetchUsers } from './redux/slices/UsersList/userSlice'

import { NavBar } from './components/User/NavBar'
import Footer from './components/User/Footer'
import { ToastContainer, toast } from 'react-toastify'

function App() {
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
    dispatch(fetchOrders())
    dispatch(fetchUsers())
  }, [])
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
