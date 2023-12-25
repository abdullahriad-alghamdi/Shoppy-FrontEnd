import { Route, Routes } from 'react-router-dom'

import Home from '../components/pages/Home/Home'
import NotFound from '../components/pages/NotFound'
import Login from '../components/pages/Login'
import Registry from '../components/pages/Registry'
import ProductDetails from '../components/pages/Home/ProductDetails'

import UserProtectedRouter from './UserProtectedRouter'
import UserDashboard from '../components/User/pages/UserDashboard/UserDashboard'
import UserProfile from '../components/User/pages/UserDashboard/UserProfileEdit'
import UserProfileEdit from '../components/User/pages/UserDashboard/UserProfileEdit'
import Cart from '../components/User/pages/Cart/Cart'
import OrdersHistory from '../components/User/pages/UserDashboard/OrdersHistory'

import AdminProtectedRouter from './AdminProtectedRouter'
import AdminDashboard from '../components/Admin/pages/AdminDashboard/AdminDashboard'
import AdminProfileEdit from '../components/Admin/pages/AdminDashboard/AdminProfileEdit'
import Categories from '../components/Admin/pages/AdminDashboard/Categories'
import Products from '../components/Admin/pages/AdminDashboard/Products'
import Orders from '../components/Admin/pages/AdminDashboard/Orders'
import UsersList from '../components/Admin/pages/AdminDashboard/Users'
import Activation from '../components/pages/Activation'
import ForgotPassword from '../components/pages/ForgotPassword'
import ResetPassword from '../components/pages/RestPassword'

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

        {/* <Route path="/dashboard" element={<AdminProtectedRouter />}> */}
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/profile" element={<AdminProfileEdit />} />
        <Route path="admin/categories" element={<Categories />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/users" element={<UsersList />} />
        <Route path="admin/orders" element={<Orders />} />
        {/* </Route> */}

        {/* <Route path="/dashboard" element={<UserProtectedRouter />}> */}
        <Route path="user" element={<UserDashboard />} />
        <Route path="user/profile" element={<UserProfile />} />
        <Route path="user/ordersHistory" element={<OrdersHistory />} />
        <Route path="user/profile/edit" element={<UserProfileEdit />} />
        {/* </Route> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default Router
