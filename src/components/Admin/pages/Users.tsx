import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import {
  User,
  deleteUser,
  fetchUsers,
  searchUsers,
  sortUsers
} from '../../../redux/slices/UsersList/userSlice'

import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import AdminSideBar from './AdminSideBar'

function UsersList() {
  const dispatch: AppDispatch = useDispatch()
  const { users, isLoading, error, searchBy } = useSelector((state: RootState) => state.Users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  if (error) {
    return <h3> {error} </h3>
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let searchTerm = e.target.value
    dispatch(searchUsers(searchTerm))
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let sortBy = e.target.value
    dispatch(sortUsers(sortBy))
  }
  const filterUsers = (users: User[]) => {
    return users.filter((user) =>
      user.firstName.toString().toLowerCase().includes(searchBy.toString().toLowerCase())
    )
  }

  const handleDeleteUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteUser(e.currentTarget.id))
  }

  const filteredUsers = filterUsers(users)
  return (
    <>
      <section className="admin-dashboard">
        <AdminSideBar />
        <section className="admin-dashboard-content">
          <section className="dashboard-header">
            <label
              htmlFor="products__searching"
              className="d-flex flex-wrap justify-content-center align-items-center">
              <input
                value={searchBy}
                onChange={handleSearchInputChange || ''}
                id="products__searching"
                type="text"
                placeholder="Search..."
                className="form-control m-2 w-50"
              />
              <button className="btn  btn-dark">Search</button>
            </label>
            <label
              htmlFor="users__sorting"
              className="d-flex flex-wrap justify-content-center align-items-center m-3">
              Sort by:
              <select
                id="users__sorting"
                onChange={handleSortChange}
                className="form-select m-2 w-25">
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
              </select>
            </label>
          </section>

          <section>
            {!error && isLoading ? (
              <h3> Loading users...</h3>
            ) : filteredUsers.length > 0 ? (
              <table
                border={1}
                className="table table-striped table-hover table-bordered border-dark mx-auto w-75">
                <thead className="table-dark text-center">
                  <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td className="d-flex justify-content-around">
                        <button onClick={handleDeleteUser} className="btn btn-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              'No users found'
            )}
          </section>
        </section>
      </section>
    </>
  )
}

export default UsersList
