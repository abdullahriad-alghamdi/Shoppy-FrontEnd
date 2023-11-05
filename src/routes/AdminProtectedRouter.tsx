import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Outlet } from 'react-router-dom'


import NotFound from '../components/pages/NotFound'

export default function AdminProtectedRouter() {
  const { isLogin, userData } = useSelector((state: RootState) => state.users)

  return isLogin && userData?.role === 'admin' ? (
    <Outlet />
  ) : (
    <NotFound />
  )
}
