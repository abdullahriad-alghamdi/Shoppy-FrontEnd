import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/store'
import { useState } from 'react'
import {
  User,
  banStatus,
  baseURl,
  deleteUser,
  grantRole,
  searchUsers,
  sortUsers
} from '../../../../redux/slices/usersList/userSlice'

import AdminSideBar from './AdminSideBar'
import { Stack, Pagination } from '@mui/material'

function UsersList() {
  const dispatch: AppDispatch = useDispatch()
  const { users, error, searchBy } = useSelector((state: RootState) => state.users)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let searchTerm = e.target.value
    setCurrentPage(1)
    dispatch(searchUsers(searchTerm))
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let sortBy = e.target.value
    dispatch(sortUsers(sortBy))
  }
  const filterUsers = (users: User[]) => {
    return users.filter(
      (user) =>
        user.name &&
        user.name
          .toString()
          .toLowerCase()
          .includes(searchBy && searchBy.toString().toLowerCase())
    )
  }

  const handleDeleteUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    const slug = e.currentTarget.id
    const confirmDelete = window.confirm('Are you sure you want to delete this user?')
    if (!confirmDelete) {
      return
    }

    dispatch(deleteUser(slug))
  }

  const handleBanStatus = (id: string) => {
    dispatch(banStatus(id))
  }

  const handleGrantRole = (id: string) => {
    dispatch(grantRole(id))
  }
  // if (isLoading) {
  //   return (
  //     <h2 className="loading">
  //       <Spinner animation="grow" variant="light" />
  //     </h2>
  //   )
  // }

  const filteredUsers = filterUsers(users)

  // pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  return (
    <>
      <section>
        <AdminSideBar />
        <section>
          <section>
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
                <option value="name">Name</option>
              </select>
            </label>
          </section>

          <section>
            {currentItems.length > 0 ? (
              <>
                <table
                  border={1}
                  className="table table-striped table-hover table-bordered border-dark mx-auto w-75 align-middle text-center users-table">
                  <thead className="table-dark text-center">
                    <tr>
                      <th>Slug</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Ban status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((user) => (
                      <tr key={user._id}>
                        <td>{user.slug}</td>
                        <td>
                          <img
                            src={baseURl + user.image}
                            alt=""
                            width="50"
                            style={{ borderRadius: '50%', height: '50px' }}
                          />
                        </td>

                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.isAdmin ? (
                            <span className="badge bg-primary">Admin</span>
                          ) : (
                            <span className="badge bg-secondary">User</span>
                          )}
                        </td>
                        <td>
                          {user.isBanned ? (
                            <span className="badge bg-danger">Banned</span>
                          ) : (
                            <span className="badge bg-success">Active</span>
                          )}
                        </td>
                        <td className="d-flex justify-content-around">
                          <button
                            onClick={handleDeleteUser}
                            className="btn btn-danger"
                            id={`${user.slug}`}>
                            Delete
                          </button>
                          <button
                            className="btn btn-warning"
                            style={{ width: '80px', textAlign: 'center' }}
                            onClick={() => handleBanStatus(user._id)}>
                            {user.isBanned ? <span>Unban</span> : <span>Ban</span>}
                          </button>
                          <button
                            className="btn btn-primary"
                            style={{ width: '100px', textAlign: 'center' }}
                            onClick={() => handleGrantRole(user._id)}>
                            {user.isAdmin ? <span>👑 Admin</span> : <span>🤨 User</span>}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Stack spacing={2} sx={{ marginTop: 4 }} className="d-flex align-items-center p-5 ">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, page) => setCurrentPage(page)}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                  />
                </Stack>
              </>
            ) : (
              <h1 className="text-center text-muted my-5">No users found</h1>
            )}
          </section>
        </section>
      </section>
    </>
  )
}

export default UsersList
