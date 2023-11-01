import { Link } from 'react-router-dom'

import { FaUser, FaCartPlus } from 'react-icons/fa'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/slices/UsersList/userSlice'
import { toast } from 'react-toastify'

export function NavBar() {
  const { isLogin, userData } = useSelector((state: RootState) => state.users)

  const dispatch: AppDispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
    toast.promise(Promise.resolve(), {
      pending: 'Logging out...',
      success: 'Logged out successfully',
      error: 'Error logging out'
    })
  }

  return (
    <>
      <div className="nav-bar">
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            <span className="logo">Shoppy</span>
          </Link>
        </div>
        <div className="nav-right">
          <ul>
            <li className="small-navbar">
              <nav className="sub-nav">
                <button className="sub-nav__btn">
                  <span>
                    <FaUser />
                    Account
                  </span>
                </button>
                <nav className="sub-nav__content">
                  {isLogin && userData?.role === 'visitor' && (
                    <Link to="/dashboard/user">User Dashboard</Link>
                  )}
                  {isLogin && userData?.role === 'admin' && (
                    <Link to="/dashboard/admin">Admin Dashboard</Link>
                  )}
                  {!isLogin && <Link to="/login">Login</Link>}
                  {isLogin && (
                    <Link to="/" onClick={handleLogout}>
                      Logout
                    </Link>
                  )}
                  {!isLogin && <Link to="/Registry">Sign Up</Link>}
                </nav>
              </nav>
            </li>
            <li>
              {isLogin && userData?.role === 'visitor' && (
                <Link to="/dashboard/user/MyCart">
                  <span>
                    <FaCartPlus />
                    Cart
                  </span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
