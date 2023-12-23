import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/store'

import {
  Product,
  addProduct,
  fetchProducts,
  removeProduct,
  searchProducts,
  sortProducts,
  updateProduct
} from '../../../../redux/slices/products/productSlice'
import AdminSideBar from './AdminSideBar'

import { FaDropbox, FaPlusCircle, FaTimes } from 'react-icons/fa'
import { Category } from '../../../../redux/slices/categories/categorySlice'
import { baseURl } from '../../../../redux/slices/usersList/userSlice'
import { Pagination, Stack } from '@mui/material'

const initialProductState = {
  title: '',
  description: '',
  price: 0,
  quantity: 0,
  image: '',
  category: ''
}
function Products() {
  const dispatch: AppDispatch = useDispatch()
  const { products, isLoading, error, searchBy, totalPages } = useSelector(
    (state: RootState) => state.products
  )
  const { categories } = useSelector((state: RootState) => state.categories)

  const [MycurrentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(4)
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [isEdit, setisEdit] = useState(false)
  const [product, setProduct] = useState(initialProductState)
  const [seletedSlug, setSeletedSlug] = useState('')

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let searchTerm = (e as React.ChangeEvent<HTMLInputElement>).target.value
    dispatch(searchProducts(searchTerm))
  }

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let sortValue = e.target.value
    dispatch(sortProducts(sortValue))
  }

  const filterProducts = (products: Product[], searchBy: string | number) => {
    return products.filter((product) => {
      return (
        product.title.toLowerCase().includes(searchBy.toString().toLowerCase()) ||
        product._id.toString().includes(searchBy.toString())
      )
    })
  }

  const filteredProducts = searchBy ? filterProducts(products, searchBy) : products

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement
      setProduct((prev) => ({ ...prev, [name]: fileInput.files?.[0] }))
    } else if (name === 'price' || name === 'quantity') {
      setProduct((prev) => ({ ...prev, [name]: Number(value) }))
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }))
    }
  }

  // handleing default category
  useEffect(() => {
    if (categories.length > 0) {
      setProduct((prev) => ({
        ...prev,
        category: categories.find((c) => c.title === 'Uncategorized')?._id || ''
      }))
    }
  }, [categories])

  const handleEditAction = (e: MouseEvent<HTMLButtonElement>, slug: string) => {
    e.preventDefault()
    // find the product by slug
    const product = products.find((product) => product.slug === slug)
    // set the product state
    if (product) {
      // setProduct({
      //   ...product,
      //   category: product.category._id // Assuming the category object has an _id property
      // })
      setSeletedSlug(slug)
    }
    // open the form
    setIsOpenForm(true)
    // set the edit state
    setisEdit(true)
  }

  const handleFormSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', product.title)
    formData.append('description', product.description)
    formData.append('price', product.price.toString())
    formData.append('quantity', product.quantity.toString())
    formData.append('image', product.image)
    formData.append('category', product.category)
    if (!isEdit) {
      try {
        dispatch(addProduct(formData))
      } catch (error) {
        return
      }
    } else {
      // object has the form data and the slug
      const theFormData = {
        formData,
        slug: seletedSlug
      }
      dispatch(updateProduct(theFormData))
    }
  }

  // if the form close reset the product state
  useEffect(() => {
    if (!isOpenForm) {
      setProduct(initialProductState)
      setisEdit(false)
    }
  }, [isOpenForm])

  const pagination = {
    page: MycurrentPage,
    limit: itemsPerPage
  }
  useEffect(() => {
    dispatch(fetchProducts(pagination))
  }, [dispatch, MycurrentPage, itemsPerPage])

  return (
    <>
      <section>
        <AdminSideBar />
        {/* create and edit form */}
        {!isEdit ? (
          <button
            className=" col-2"
            style={{
              margin: 'auto',
              marginTop: '30px',
              marginLeft: '100px',
              width: '50px',
              border: 'none',
              backgroundColor: 'transparent'
            }}
            onClick={() => {
              setIsOpenForm(!isOpenForm)
            }}>
            <FaPlusCircle size={50} />
          </button>
        ) : (
          <button
            className=" col-2"
            style={{
              margin: 'auto',
              marginTop: '30px',
              marginLeft: '100px',
              width: '50px',
              border: 'none',
              backgroundColor: 'transparent'
            }}
            onClick={() => {
              setIsOpenForm(false)
            }}>
            <FaTimes size={50} />
          </button>
        )}

        {/* form */}
        <section
          className="container d-flex flex-column  align-items-left gap-3 "
          style={{ width: '500px', margin: 'auto', marginBottom: '50px', height: '100%' }}>
          {isOpenForm && (
            <form className="container col-6 bg-light p-3 col-12">
              <h2 className="text-center">Add Product</h2>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={product.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows={3}
                  name="description"
                  value={product.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  value={Number(product.price)}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  accept="image/*"
                  name="image"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  className="form-select"
                  id="category"
                  name="category"
                  value={product.category}
                  onChange={handleInputChange}>
                  {categories.map((category: Category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  name="quantity"
                  value={Number(product.quantity)}
                  onChange={handleInputChange}
                />
              </div>

              {isEdit ? (
                <button
                  type="submit"
                  className="btn btn-primary"
                  name="update"
                  onClick={handleFormSubmit}
                  style={{ width: '100%' }}>
                  Update
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={handleFormSubmit}
                  name="create"
                  style={{ width: '100%' }}>
                  Create
                </button>
              )}
            </form>
          )}
        </section>
        {/* main page */}
        <section>
          {/* sorting and searching */}
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
              htmlFor="products__sorting"
              className="d-flex flex-wrap justify-content-center align-items-center">
              Sort by:
              <select
                id="products__sorting"
                onChange={handleSortChange}
                className="form-select m-2 w-25">
                <option value="price">Price</option>
                <option value="name">Name</option>
              </select>
            </label>
          </section>
          {/* Products */}
          <section className="container d-flex justify-content-center flex-wrap gap-3 p-3">
            <table
              border={1}
              style={{
                minHeight: '500px'
              }}
              className="table table-striped table-hover table-bordered border-dark mx-auto w-75 align-middle text-center Products-table table-responsive">
              <thead className="table-dark text-center">
                <tr>
                  <th>Slug</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>CountInStock</th>
                  <th>Sold</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((Product) => (
                  <tr key={Product._id}>
                    <td>{Product.slug}</td>
                    <td>
                      <img src={baseURl + Product.image} alt="" width="50" />
                    </td>

                    <td>{Product.title}</td>
                    <td>{Product.price}</td>
                    <td>{Product.quantity}</td>
                    <td>{Product.countInStock}</td>
                    <td>{Product.sold}</td>
                    <td>{Product.category.title}</td>
                    <td className="d-grid gap-2">
                      <button
                        className="btn btn-warning"
                        onClick={(e) => handleEditAction(e, Product.slug)}>
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => dispatch(removeProduct(Product.slug))}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </section>
        <Stack spacing={2} sx={{ marginTop: 4 }} className="d-flex align-items-center p-5 ">
          <Pagination
            count={totalPages}
            page={MycurrentPage}
            onChange={(e, page) => {
              setCurrentPage(page)
            }}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </Stack>
      </section>
    </>
  )
}

export default Products
