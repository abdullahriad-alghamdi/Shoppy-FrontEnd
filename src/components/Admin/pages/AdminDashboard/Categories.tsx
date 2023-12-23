import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/store'
import { toast } from 'react-toastify' // Add this import statement

import AdminSideBar from './AdminSideBar'
import {
  addCategory,
  fetchCategories,
  removeCategory,
  updateCategory
} from '../../../../redux/slices/categories/categorySlice'

import { Button, Card } from 'react-bootstrap'

function Categories() {
  const { categories, isLoading, error } = useSelector((state: RootState) => state.categories)
  const [category, setCategory] = useState<{ title: string }>({
    title: ''
  })
  const [isEdit, setIsEdit] = useState(false)
  const [selectedSlug, setSelectedSlug] = useState<string>('')

  const dispatch: AppDispatch = useDispatch()

  if (error) {
    toast.success(error, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true
    })
  }
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addCategory(category))
    setCategory({ title: '' })
  }

  const handleDelete = (slug: string) => () => {
    dispatch(removeCategory(slug))
  }

  const handleEdit = (slug: string, title: string) => {
    setSelectedSlug(slug)
    setIsEdit(true)
    setCategory({ title })
  }

  const handleSave = () => {
    dispatch(updateCategory({ slug: selectedSlug, title: category.title }))
    setIsEdit(false)
    setSelectedSlug('')
    setCategory({ title: '' })
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
                value={`${isEdit ? category.title : category.title}`}
                onChange={(e) => setCategory({ ...category, title: e.target.value })}
              />
              {isEdit ? (
                <Button variant="primary m-2 w-75" onClick={handleSave}>
                  Save
                </Button>
              ) : (
                <button
                  type="submit"
                  className=" btn btn-dark m-2 w-75"
                  onClick={() => {
                    handleAdd
                  }}>
                  Add Category
                </button>
              )}
            </label>
          </form>
          <section>
            <div className="d-flex flex-wrap justify-content-center align-items-center mb-5">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <Card key={category._id} className="col-6 col-lg-2 col-md-4 m-2">
                    <Card.Body>
                      <Card.Title>{category.title}</Card.Title>
                      <Card.Text>Slug: {category.slug}</Card.Text>
                      <div className="d-flex justify-content-around align-items-center">
                        <button
                          className="btn btn-success"
                          onClick={() => handleEdit(category.slug, category.title)}>
                          Edit
                        </button>
                        <button className="btn btn-danger" onClick={handleDelete(category.slug)}>
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
