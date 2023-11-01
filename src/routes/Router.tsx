import { Route, Routes } from 'react-router-dom'

import Home from '../components/User/pages/Home'
import NotFound from '../components/pages/NotFound'
import Login from '../components/pages/Login'
import Registry from '../components/User/pages/Registry'
import ProductDetails from '../components/User/pages/ProductDetails'

import UserDashboard from '../components/User/pages/UserDashboard'
import UserProfile from '../components/User/pages/UserProfile'
import UserOrders from '../components/User/pages/UserOrders'
import Cart from '../components/User/pages/Cart'
import UserProtectedRouter from './UserProtectedRouter'

import AdminDashboard from '../components/Admin/pages/AdminDashboard'
import Categories from '../components/Admin/pages/Categories'
import Products from '../components/Admin/pages/Products'
import Orders from '../components/Admin/pages/Orders'
import UsersList from '../components/Admin/pages/Users'
import AddNewProduct from '../components/Admin/pages/AddNewProduct'
import AdminProtectedRouter from './AdminProtectedRouter'

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Registry" element={<Registry />} />
        <Route path="product/details/:id" element={<ProductDetails />} />

        <Route path="/dashboard" element={<AdminProtectedRouter />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/categories" element={<Categories />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/NewProduct" element={<AddNewProduct />} />
          <Route path="admin/users" element={<UsersList />} />
          <Route path="admin/orders" element={<Orders />} />
        </Route>

        <Route path="/dashboard" element={<UserProtectedRouter />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<UserOrders />} />
          <Route path="user/MyCart" element={<Cart />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default Router
