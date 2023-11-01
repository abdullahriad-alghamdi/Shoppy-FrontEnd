import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Outlet, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
import NotFound from '../components/pages/NotFound'

export default function UserProtectedRouter() {
  const { isLogin, userData } = useSelector((state: RootState) => state.users)

  return isLogin && userData?.role === 'visitor' ? (
    <Outlet />
  ) : (
    toast.warning('You are not authorized to view this page') && <NotFound />
  )
}
