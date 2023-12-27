import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Outlet } from 'react-router-dom'

import Login from '../pages/user/loginRegistration/Login'

export default function AdminProtectedRouter() {
  const { isLogin, userData } = useSelector((state: RootState) => state.users)
  return isLogin && userData?.isAdmin ? <Outlet /> : <Login />
}
