import { FaUser, FaCartPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
export function NavBar() {
  return (
    <>
      <div className="NavBar">
        <div className="navLeft">
          <Link to="/">
            <img src="/assets/logo.svg" alt="ShoppyLogo" />
          </Link>
        </div>
        <div className="navRight">
          <ul>
            <li className="navbar">
              <nav className="subNav">
                <button className="subNavBtn">
                  <FaUser /> Account
                </button>
                <nav className="subNav-content">
                  <Link to="/dashboard/user">User Dashboard</Link>
                  <Link to="/dashboard/admin">Admin Dashboard</Link>
                  <Link to="/login">Login</Link>
                  <Link to="/">Logout</Link>
                  <Link to="/Registry">Sign Up</Link>
                </nav>
              </nav>
            </li>
            <li>
              <Link to="/dashboard/user/MyCart" className="mt-2">
                <FaCartPlus />
                <span>Cart</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
