import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'

import AdminSideBar from './AdminSideBar'
import {
  addCategory,
  removeCategory,
  updateCategory
} from '../../../../redux/slices/Categories/categorySlice'


import { Button, Card, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'

function Categories() {
  const { categories, isLoading, error } = useSelector((state: RootState) => state.categories)
  const [category, setCategory] = useState<{ name: string }>({
    name: ''
  })
  const [isEdit, setIsEdit] = useState(false)
  const [selectedId, setSelectedId] = useState<number>(0)


  const dispatch = useDispatch()

  if (error) {
    return <h2 className="loading">{error}</h2>
  }

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addCategory({ name: category.name, id: categories[categories.length - 1].id + 1 }))
    toast.success('Category Added Successfully', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true
    })
  }

  const handleDelete = (id: number) => () => {
    dispatch(removeCategory(id))
    toast.success('Category Deleted Successfully', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true
    })
  }

  const handleEdit = (id: number, name: string) => {
    setSelectedId(id)
    setIsEdit(true)
    setCategory({ name })
  }

  const handleSave = () => {
    dispatch(updateCategory({ id: selectedId, name: category.name }))
    setIsEdit(false)
    setSelectedId(0)
    toast.success('Category Updated Successfully', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true
    })
  }
  return (
    <>
      <section>
        <AdminSideBar />

        <main>
          <form className="d-flex justify-content-center align-items-center" onSubmit={handleAdd}>
            <label
              htmlFor="categories__adding"
              className="d-flex flex-direction-column justify-content-center align-items-center m-5">
              <input
                className="form-control m-2 w-75"
                type="text"
                placeholder="Category Name..."
                value={`${isEdit ? category.name : ''}`}
                onChange={(e) => setCategory({ ...category, name: e.target.value })}
              />
              {isEdit ? (
                <Button variant="primary m-2 w-75" onClick={handleSave}>
                  Save
                </Button>
              ) : (
                <button type="submit" className=" btn btn-dark m-2 w-75">
                  Add Category
                </button>
              )}
            </label>
          </form>
          <section>
            <div className="d-flex flex-wrap justify-content-center align-items-center mb-5">
              {!error && isLoading ? (
                <h2 className="loading">
                  <Spinner animation="border" variant="light" />
                </h2>
              ) : categories.length > 0 ? (
                categories.map((category) => (
                  <Card key={category.id} className="col-6 col-lg-2 col-md-4 m-2">
                    <Card.Body>
                      <Card.Title>{category.name}</Card.Title>
                      <Card.Text>Id: {category.id}</Card.Text>
                      <div className="d-flex justify-content-around align-items-center">
                        <button
                          className="btn btn-success"
                          onClick={() => handleEdit(category.id, category.name)}>
                          Edit
                        </button>
                        <button className="btn btn-danger" onClick={handleDelete(category.id)}>
                          Delete
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <h2 className="text-muted">No Categories</h2>
              )}
            </div>
          </section>
        </main>
      </section>
    </>
  )
}

export default Categories
