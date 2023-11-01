import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from '../../../redux/store'
import {
  Product,
  removeProduct,
  searchProducts,
  sortProducts,
  updateProduct
} from '../../../redux/slices/Products/productSlice'

import { Button, Card } from 'react-bootstrap'
import AdminSideBar from './AdminSideBar'
import { FaPlusCircle } from 'react-icons/fa'
import { toast } from 'react-toastify'

function Products() {
  const [updatedProduct, setUpdatedProduct] = useState<Product>({
    id: 0,
    name: '',
    image: '',
    description: '',
    categories: [],
    variants: [],
    sizes: [],
    price: 0,
    rating: 0
  })
  const dispatch: AppDispatch = useDispatch()
  const { products, isLoading, error, searchBy } = useSelector((state: RootState) => state.products)
  const { categories } = useSelector((state: RootState) => state.categories)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedId, setSelectedId] = useState<number>(0)
  if (error) {
    return <h3> {error} </h3>
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let searchTerm = e.target.value
    dispatch(searchProducts(searchTerm))
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let sortValue = e.target.value
    dispatch(sortProducts(sortValue))
  }

  const filterProducts = (products: Product[], searchBy: string | number) => {
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchBy.toString().toLowerCase()) ||
        product.id.toString().includes(searchBy.toString())
      )
    })
  }
  const filteredProducts = searchBy ? filterProducts(products, searchBy) : products

  const handleEdit = (idN: number, product: Product) => {
    setUpdatedProduct(product)
    setIsEdit(true)
    setSelectedId(idN)
  }

  const handleSave = () => {
    dispatch(updateProduct({ id: selectedId, product: updatedProduct }))
    setIsEdit(false)
    setSelectedId(0)
    toast.success('Product Updated Successfully')
  }
  const getCategoryNameById = (categoryId: number) => {
    const category = categories.find((category) => category.id === categoryId)
    return category ? category.name : 'Category not found'
  }
  return (
    <>
      <section>
        <AdminSideBar />
        <Link
          to="/dashboard/admin/NewProduct"
          className="d-flex flex-wrap justify-content-left col-12 align-items-center text-decoration-none text-dark">
          <FaPlusCircle
            style={{
              margin: '50px',
              width: '50px',
              height: '50px',
              color: '#000000'
            }}
          />
          <h2>Add New Product</h2>
        </Link>
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

          <section className="container d-flex justify-content-center flex-wrap gap-3 p-3">
            {!error && isLoading ? (
              <h3> Loading products...</h3>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Card
                  style={{ width: '18rem' }}
                  key={product.id}
                  className="shadow p-3 mb-5 bg-body rounded d-flex flex-column  ">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    className="shadow-sm w-100 h-100 p-3 mb-5 bg-body rounded"
                  />

                  <Card.Body>
                    {isEdit && selectedId === product.id ? (
                      <>
                        <h3> Edit Product</h3>
                        <Card.Title>
                          <input
                            type="text"
                            value={updatedProduct.name}
                            onChange={(e) =>
                              setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                            }
                          />
                        </Card.Title>
                        <Card.Text>
                          <input
                            type="text"
                            value={updatedProduct.price}
                            onChange={(e) =>
                              setUpdatedProduct({
                                ...updatedProduct,
                                price: Number(e.target.value)
                              })
                            }
                          />
                        </Card.Text>
                        <Card.Text>
                          <input
                            type="text"
                            value={updatedProduct.id}
                            onChange={(e) =>
                              setUpdatedProduct({ ...updatedProduct, id: Number(e.target.value) })
                            }
                          />
                        </Card.Text>
                        <Card.Text>
                          <input
                            type="text"
                            value={isEdit ? updatedProduct.rating : product.rating}
                            onChange={(e) =>
                              setUpdatedProduct({
                                ...updatedProduct,
                                rating: Number(e.target.value)
                              })
                            }
                          />
                        </Card.Text>
                        // i will use the getCategoryNameById function to get the name of the
                        category
                        <Card.Text>
                          <select
                            id="products__sorting"
                            onChange={(e) =>
                              setUpdatedProduct({
                                ...updatedProduct,
                                categories: [Number(e.target.value)]
                              })
                            }
                            className="form-select m-2 w-25">
                            {categories.map((category) => (
                              <option value={category.id} key={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </Card.Text>
                        <Card.Text>
                          <input
                            type="text"
                            value={updatedProduct.variants.join(',')}
                            onChange={(e) =>
                              setUpdatedProduct({
                                ...updatedProduct,
                                variants: e.target.value.split(',')
                              })
                            }
                          />
                        </Card.Text>
                        <Card.Text>
                          <input
                            type="text"
                            value={
                              isEdit ? updatedProduct.sizes.join(',') : product.sizes.join(',')
                            }
                            onChange={(e) =>
                              setUpdatedProduct({
                                ...updatedProduct,
                                sizes: e.target.value.split(', ')
                              })
                            }
                          />
                        </Card.Text>
                        <Card.Text>
                          <input
                            type="text"
                            value={isEdit ? updatedProduct.description : product.description}
                            onChange={(e) =>
                              setUpdatedProduct({ ...updatedProduct, description: e.target.value })
                            }
                          />
                        </Card.Text>
                        <Card.Text>
                          <input
                            type="text"
                            value={isEdit ? updatedProduct.image : product.image}
                            onChange={(e) => {
                              setUpdatedProduct({ ...updatedProduct, image: e.target.value })
                            }}
                          />
                        </Card.Text>
                        <div className="d-flex justify-content-between">
                          <Button variant="btn text-light bg-primary" onClick={() => handleSave()}>
                            Save
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                          <b>Price:</b> {product.price}
                        </Card.Text>
                        <Card.Text>
                          <b>Id:</b> {product.id}
                        </Card.Text>
                        <Card.Text>
                          <b>Rating:</b> {product.rating}
                        </Card.Text>

                        <Card.Text>
                          <span className="fw-bold">Category: </span>
                          {product.categories
                            ? product.categories
                                .map((categoryId) => getCategoryNameById(categoryId))
                                .join(', ')
                            : 'Product not assigned to any category'}
                        </Card.Text>
                        <Card.Text>
                          <b>Variants:</b>
                          {product.variants.join(',')}
                        </Card.Text>
                        <Card.Text>
                          <b>Sizes:</b> {product.sizes.join(',')}
                        </Card.Text>
                        <Card.Text>
                          <b>Description:</b> {product.description}
                        </Card.Text>
                        <Card.Text>
                          <b>Image:</b> {product.image}
                        </Card.Text>
                      </>
                    )}
                    {isEdit && selectedId === product.id ? (
                      <div style={{ display: 'none' }}>
                        <Button
                          variant="btn text-light bg-danger"
                          onClick={() => dispatch(removeProduct({ productId: product.id }))}>
                          Delete
                        </Button>
                        <Button
                          variant="btn text-light bg-success"
                          onClick={() => handleEdit(product.id, product)}>
                          Edit
                        </Button>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-between">
                        <Button
                          variant="btn text-light bg-danger"
                          onClick={() => dispatch(removeProduct({ productId: product.id }))}>
                          Delete
                        </Button>
                        <Button
                          variant="btn text-light bg-success"
                          onClick={() => handleEdit(product.id, product)}>
                          Edit
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              ))
            ) : (
              <h2
                className="text-center text-2xl font-bold text-muted my-5"
                style={{ width: '100%' }}>
                No Products Found
              </h2>
            )}
          </section>
        </section>
      </section>
    </>
  )
}

export default Products
