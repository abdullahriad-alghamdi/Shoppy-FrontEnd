import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import {
  Product,
  removeProduct,
  searchProducts,
  sortProducts
} from '../../../redux/slices/Products/productSlice'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import AdminSideBar from './AdminSideBar'
import { NewProductWrapper } from '../NewProductWrapper'
import { toast } from 'react-toastify'
import { FaAd, FaPlusCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Products() {
  const dispatch: AppDispatch = useDispatch()
  const { products, isLoading, error, searchBy } = useSelector((state: RootState) => state.products)

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
          />{' '}
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

          <section className="container d-flex flex-wrap gap-3 p-3 ">
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
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>Price: {product.price}</Card.Text>
                    <Card.Text>Id: {product.id}</Card.Text>
                    <Button
                      variant="dark"
                      onClick={() => dispatch(removeProduct({ productId: product.id }))}>
                      Delete
                    </Button>
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
