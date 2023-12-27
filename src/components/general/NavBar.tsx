import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'

import { Badge } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { logoutUser } from '../../redux/slices/usersList/userSlice'

export function NavBar() {
  const { isLogin, userData } = useSelector((state: RootState) => state.users)
  const cartItems = useSelector((state: RootState) => state.cart.inCart)

  const dispatch: AppDispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <>
      <div className="nav-bar">
        {/* Navbar content */}
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
                  {isLogin && !userData?.isAdmin && (
                    <Link to="/dashboard/user">User Dashboard</Link>
                  )}
                  {isLogin && userData?.isAdmin && (
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
              {((isLogin && userData && !userData?.isAdmin) || !isLogin) && (
                <Link to="/MyCart">
                  <span className="cart-icon-wrapper">
                    <FaShoppingCart className="cart-icon fs-4" />
                    <Badge bg="danger" className="badge">
                      {cartItems && cartItems.length > 0 ? cartItems.length : 0}
                    </Badge>
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
