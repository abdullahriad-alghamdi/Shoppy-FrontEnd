import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'

import { addToCart } from '../../redux/slices/cart/cartSlice'
import * as productSlice from '../../redux/slices/products/productSlice'
import FilterBar from '../../components/user/FilterBar'
import Hero from '../../components/general/Hero'

import { Pagination, Stack } from '@mui/material'
import { Button, Card } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'

function Home() {
  const { products, searchBy, pagination } = useSelector((state: RootState) => state.products)

  const { isLogin, userData } = useSelector((state: RootState) => state.users)
  const [MycurrentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(4)
  const [searchTerm, setSearchTerm] = useState('')
  const [sort, setSort] = useState('')

  const dispatch: AppDispatch = useDispatch()

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let sortValue = e.target.value
    setSort(sortValue)
  }

  const handelAddToCart = (product: productSlice.Product) => {
    dispatch(addToCart(product))
  }

  const QeuerParams = {
    page: MycurrentPage,
    limit: itemsPerPage,
    sortValue: sort,
    searchTerm: searchTerm,
    categoryID: ''
  }

  useEffect(() => {
    if (searchTerm !== searchBy) {
      setCurrentPage(1)
    }
    dispatch(productSlice.fetchProducts(QeuerParams))
  }, [dispatch, MycurrentPage, itemsPerPage, sort, searchTerm, searchBy])

  return (
    <main>
      <Hero />
      <section className="products-section container mt-5 ">
        <FilterBar />
        <section className="product-header ">
          <form className="mt-5 d-flex flex-wrap justify-content-lg-between justify-content-md-center justify-content-xs-center align-items-baseline gap-3">
            <label className="d-flex justify-content-start col-lg-5 col-md-4 col-sm-12 col-xs-12">
              <input
                value={searchBy}
                onChange={handleSearchInputChange}
                className="form-control rounded-0"
                id="products__searching"
                type="text"
                placeholder="Search..."
              />
              <Button variant="dark" className="rounded-0">
                <FaSearch />
              </Button>
            </label>
            <label className="d-flex justify-content-start align-items-baseline col-md-4 col-sm-12 mt-md-3 mt-sm-3 ">
              <select
                className="form-select rounded-0 "
                aria-label="Default select example"
                onChange={handleSortChange}>
                <option defaultValue="sort by" hidden>
                  Sort by
                </option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </label>
          </form>
        </section>

        <section className="products-content mt-5">
          <div className="product d-flex flex-wrap justify-content-center gap-5">
            {products.length > 0 ? (
              products.map((product) => (
                <Card style={{ width: '18rem' }} key={product.slug} className="product-card">
                  <Link to={`/product/details/${product.slug}`}>
                    <div
                      className="d-flex justify-content-center"
                      style={{ height: '300px', overflow: 'hidden' }}>
                      <Card.Img
                        variant="top"
                        src={product.image}
                        className="product-card__image shadow-sm p-3 mb-5 bg-body rounded img-fluid"
                        style={{ objectFit: 'contain', height: '100%' }}
                      />
                    </div>
                  </Link>
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Title className="fw-bold">{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>
                      <span className="fw-bold">Category:</span> {product.category.title}
                    </Card.Text>
                    <Card.Text>
                      <b>Price:</b>
                      {` ${product.price}`} <span className="text-muted fw-bold">SAR</span>
                    </Card.Text>
                    {((isLogin && userData && !userData.isAdmin) || !isLogin) && (
                      <Card.Text>
                        <Button
                          onClick={() => {
                            handelAddToCart(product)
                          }}
                          variant="dark">
                          Add to cart
                        </Button>
                      </Card.Text>
                    )}
                  </Card.Body>
                </Card>
              ))
            ) : (
              <h2 className="text-muted m-5">No products found</h2>
            )}
          </div>

          <Stack spacing={2} sx={{ marginTop: 4 }} className="d-flex align-items-center p-5 ">
            <Pagination
              count={pagination.totalPages}
              page={MycurrentPage}
              onChange={(e, page) => {
                e.preventDefault()
                setCurrentPage(page)
              }}
              variant="outlined"
              shape="rounded"
              color="primary"
            />
          </Stack>
        </section>
      </section>
    </main>
  )
}

export default Home
