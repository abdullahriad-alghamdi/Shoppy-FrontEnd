import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import {
  Product,
  fetchProducts,
  searchProducts,
  sortProducts
} from '../../../redux/slices/products/productSlice'
import { Link } from 'react-router-dom'

import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Rating from '@mui/material/Rating'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import Hero from '../Hero'
import FilterBar from '../FilterBar'
import Spinner from 'react-bootstrap/spinner'

function Home() {
  const dispatch: AppDispatch = useDispatch()
  const { products, isLoading, error, searchBy } = useSelector((state: RootState) => state.products)
  const { categories } = useSelector((state: RootState) => state.categories)

  const getCategoryNameById = (categoryId: number) => {
    const category = categories.find((category) => category.id === categoryId)
    return category ? category.name : 'Category not found'
  }

  if (error) {
    return <h2 className="loading">{error}</h2>
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
    <main className="overflow-auto">
      <Hero />
      <section className="products-section container mt-5">
        <FilterBar />
        <section className="product-header ">
          <form className="d-flex justify-content-between m-5">
            <label className="search-container col-4 d-flex ">
              <input
                value={searchBy}
                onChange={handleSearchInputChange || ''}
                className="search-input form-control"
                id="products__searching"
                type="text"
                placeholder="Search..."
              />
              <button className="search-button">Search</button>
            </label>
            <label className="sort-label">
              <span className="text">Sort by:</span>
              <select onChange={handleSortChange}>
                <option value="price">Price</option>
                <option value="name">Name</option>
              </select>
            </label>
          </form>
        </section>

        <section className="products-content mt-5">
          <div className="product d-flex flex-wrap justify-content-center gap-5">
            {filteredProducts.length > 0
              ? filteredProducts.map((product) => (
                  <Card style={{ width: '18rem' }} key={product.id} className="product-card">
                    <Link to={`/product/details/${product.id}`}>
                      <div
                        className="d-flex justify-content-center"
                        style={{ height: '300px', overflow: 'hidden' }}>
                        <Card.Img
                          variant="top"
                          src={product.image}
                          className="product-card__image shadow-sm p-3 mb-5 bg-body rounded img-fluid"
                        />
                      </div>
                    </Link>
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <Card.Title className="d-flex justify-content-between">
                        <Card.Title>{product.name}</Card.Title>
                        <Rating name="read-only" value={Number(product.rating)} readOnly />
                      </Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                      <Card.Text>
                        <span className="fw-bold">Category: </span>
                        {product.categories
                          ? product.categories
                              .map((categoryId) => getCategoryNameById(categoryId))
                              .join(', ')
                          : 'Product not assigned to any category'}
                      </Card.Text>
                      <Card.Text>
                        <b>Price:</b>
                        {` ${product.price} €`}
                      </Card.Text>
                      <Card.Text>
                        <Button variant="dark">Add to cart</Button>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))
              : 'No products found'}
          </div>
          <Stack spacing={2} sx={{ marginTop: 4 }} className="d-flex align-items-center p-5 ">
            <Pagination count={10} />
          </Stack>
        </section>
      </section>
    </main>
  )
}

export default Home
