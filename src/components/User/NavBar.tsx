import { FaUser, FaCartPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
export function NavBar() {
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
                  <Link to="/dashboard/user">User Dashboard</Link>
                  <Link to="/dashboard/admin">Admin Dashboard</Link>
                  <Link to="/login">Login</Link>
                  <Link to="/">Logout</Link>
                  <Link to="/Registry">Sign Up</Link>
                </nav>
              </nav>
            </li>
            <li>
              <Link to="/dashboard/user/MyCart">
                <span>
                  <FaCartPlus />
                  Cart
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
