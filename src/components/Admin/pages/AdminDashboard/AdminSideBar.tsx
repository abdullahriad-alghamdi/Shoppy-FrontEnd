import { Link } from 'react-router-dom'

const AdminSideBar = () => {
  return (
    <aside className="admin-sidebar p-3 my-4">
      <ul className="nav w-100 d-flex justify-content-around">
        <Link to="/dashboard/admin/">
          <li>Profile</li>
        </Link>
        <Link to="/dashboard/admin/categories">
          <li>Categories</li>
        </Link>
        <Link to="/dashboard/admin/products">
          <li>Products</li>
        </Link>
        <Link to="/dashboard/admin/users">
          <li>Users</li>
        </Link>
        <Link to="/dashboard/admin/orders">
          <li>Orders</li>
        </Link>
      </ul>
    </aside>
  )
}

export default AdminSideBar
