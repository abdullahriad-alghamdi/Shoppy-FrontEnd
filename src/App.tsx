import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './redux/store'
import Router from './routes/Router'

import { fetchCategories } from './redux/slices/categories/categorySlice'
import { fetchOrders } from './redux/slices/orders/orderSlice'
import { fetchAllProducts } from './redux/slices/products/productSlice'
import { fetchUsers } from './redux/slices/usersList/userSlice'

import { ToastContainer } from 'react-toastify'
import Footer from './components/general/Footer'
import { NavBar } from './components/general/NavBar'

function App() {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllProducts())
    dispatch(fetchCategories())
    dispatch(fetchOrders())
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <>
      <div className="app">
        <NavBar />
        <Router />
        <Footer />
        <ToastContainer />
      </div>
    </>
  )
}

export default App
