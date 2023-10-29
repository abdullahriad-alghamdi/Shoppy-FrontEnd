import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'

import AdminSideBar from './AdminSideBar'
import { fetchCategories } from '../../../redux/slices/categories/categorySlice'

function Categories() {
  const { categories, isLoading, error } = useSelector((state: RootState) => state.categories)

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  if (error) {
    return <h3> {error} </h3>
  }

  return (
    <>
      <section className="admin-dashboard">
        <AdminSideBar />
        <main>
          <section className="dashboard-header">
            <div></div>
            <label
              htmlFor="categories__adding"
              className="d-flex flex-direction-column justify-content-center align-items-center m-5">
              {' '}
              <input
                // value={CategoryName}
                // onChange={handleInputChange || ''}
                className="form-control m-2 w-75"
                id="categories__adding"
                type="text"
                placeholder="Category Name..."
              />
              <button
                className=" btn btn-dark m-2 w-75
              ">
                Add Category
              </button>
            </label>
          </section>
          <section className="dashboard-content-container">
            <div className="dashboard-content">
              {!error && isLoading ? (
                <h3> Loading categories...</h3>
              ) : categories.length > 0 ? (
                <table className="table table-striped table-hover table-bordered border-dark mx-auto w-75">
                  <thead className="table-dark text-center">
                    <tr>
                      <th>Category Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category.id}>
                        <td>{category.name}</td>
                        <td className="d-flex justify-content-around">
                          <button className=" btn btn-success">Edit</button>
                          <button className="btn btn-danger">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                'No categories found'
              )}
            </div>
          </section>
        </main>
      </section>
    </>
  )
}

export default Categories
