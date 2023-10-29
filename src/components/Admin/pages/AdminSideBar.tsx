import { Link } from 'react-router-dom'

const AdminSideBar = () => {
  return (
    <aside className="admin-sideBar">
      <h3>Admin Dashboard</h3>
      <ul>
        <li>
          <Link to="/dashboard/admin/categories">Categories</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/products">Products</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/users">Users</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/orders">Orders</Link>
        </li>
      </ul>
    </aside>
  )
}

export default AdminSideBar
