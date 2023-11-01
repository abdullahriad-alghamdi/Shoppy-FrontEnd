import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Outlet, useNavigate } from 'react-router-dom'

import Login from '../components/pages/Login'
import { toast } from 'react-toastify'

export default function AdminProtectedRouter() {
  const navigate = useNavigate()
  const { isLogin, userData } = useSelector((state: RootState) => state.users)

  return isLogin && userData?.role === 'admin' ? (
    <Outlet />
  ) : (
    toast.warning('You are not authorized to view this page') && navigate('*')
  )
}
