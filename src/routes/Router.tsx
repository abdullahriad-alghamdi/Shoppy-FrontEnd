import { Route, Routes } from 'react-router-dom'

import Home from '../pages/general/Home'
import NotFound from '../pages/general/NotFound'
import Login from '../pages/user/loginRegistration/Login'
import Registry from '../pages/user/loginRegistration/Registry'
import ProductDetails from '../pages/general/ProductDetails'

import UserProtectedRouter from './UserProtectedRouter'
import UserDashboard from '../pages/user/UserDashboard'
import UserProfile from '../pages/user/UserProfileEdit'
import UserProfileEdit from '../pages/user/UserProfileEdit'
import Cart from '../pages/cart/Cart'
import OrdersHistory from '../pages/user/OrdersHistory'

import AdminProtectedRouter from './AdminProtectedRouter'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminProfileEdit from '../pages/admin/AdminProfileEdit'
import Categories from '../pages/admin/Categories'
import Products from '../pages/admin/Products'
import Orders from '../pages/admin/Orders'
import UsersList from '../pages/admin/Users'
import Activation from '../pages/user/loginRegistration/Activation'
import ForgotPassword from '../pages/user/loginRegistration/ForgotPassword'
import ResetPassword from '../pages/user/loginRegistration/RestPassword'

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Registry" element={<Registry />} />
        <Route path="/activate/:token" element={<Activation />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="resetPassword/:token" element={<ResetPassword />} />
        <Route path="product/details/:id" element={<ProductDetails />} />
        <Route path="/MyCart" element={<Cart />} />

        <Route path="/dashboard" element={<AdminProtectedRouter />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/profile" element={<AdminProfileEdit />} />
          <Route path="admin/categories" element={<Categories />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<UsersList />} />
          <Route path="admin/orders" element={<Orders />} />
        </Route>

        <Route path="/dashboard" element={<UserProtectedRouter />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/ordersHistory" element={<OrdersHistory />} />
          <Route path="user/profile/edit" element={<UserProfileEdit />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default Router
