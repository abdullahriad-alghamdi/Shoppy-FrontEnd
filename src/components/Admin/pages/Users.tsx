import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import { User, deleteUser, searchUsers, sortUsers } from '../../../redux/slices/UsersList/userSlice'

import AdminSideBar from './AdminSideBar'
import { Spinner } from 'react-bootstrap'

function UsersList() {
  const dispatch: AppDispatch = useDispatch()
  const { users, isLoading, error, searchBy } = useSelector((state: RootState) => state.users)

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
    const userId = e.currentTarget.id
    const confirmDelete = window.confirm('Are you sure you want to delete this user?')
    if (!confirmDelete) {
      return
    }
    console.log('delete user', typeof userId)

    dispatch(deleteUser(userId))
  }

  if (isLoading) {
    return (
      <h2 className="loading">
        <Spinner animation="grow" variant="light" />
      </h2>
    )
  }

  if (error) {
    return <h2 className="loading">{error}</h2>
  }

  const filteredUsers = filterUsers(users)
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
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
              </select>
            </label>
          </section>

          <section>
            {filteredUsers.length > 0 ? (
              <table
                border={1}
                className="table table-striped table-hover table-bordered border-dark mx-auto w-75 responsive">
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
                        <button
                          onClick={handleDeleteUser}
                          className="btn btn-danger"
                          id={`${user.id}`}>
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
