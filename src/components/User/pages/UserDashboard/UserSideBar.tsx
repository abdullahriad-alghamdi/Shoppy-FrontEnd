import { Link } from 'react-router-dom'

const UserSideBar = () => {
    return (

        <aside className="admin-sidebar p-3 my-4">
            <ul className="nav w-100 d-flex justify-content-around">
                <Link to="/dashboard/user/Profile">
                    <li>Profile</li>
                </Link>
                <Link to="/dashboard/user/ordersHistory">
                    <li>Orders History</li>
                </Link>
            </ul>
        </aside>
    )
}

export default UserSideBar
