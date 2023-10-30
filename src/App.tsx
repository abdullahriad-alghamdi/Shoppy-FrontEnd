import Footer from './components/User/Footer'
import { NavBar } from './components/User/NavBar'
import Router from './routes/Router'
import { useDispatch } from 'react-redux'
import { fetchCategories } from './redux/slices/categories/categorySlice'
import { useEffect } from 'react'
import { AppDispatch } from './redux/store'
import { fetchProducts } from './redux/slices/products/productSlice'

function App() {
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, [])
  return (
    <div className="App">
      <NavBar />
      <Router />
      <Footer />
    </div>
  )
}

export default App
