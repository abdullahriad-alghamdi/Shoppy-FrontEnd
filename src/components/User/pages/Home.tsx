import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import { Product, searchProducts, sortProducts } from '../../../redux/slices/Products/productSlice'
import { Link } from 'react-router-dom'

import { Rating, Stack, Pagination } from '@mui/material'

import { Button, Card } from 'react-bootstrap'

import Hero from '../Hero'
import FilterBar from '../FilterBar'
import { FaSearch } from 'react-icons/fa'

function Home() {
  const dispatch: AppDispatch = useDispatch()
  const { products, error, searchBy } = useSelector((state: RootState) => state.products)
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
      <section className="products-section container mt-5 ">
        <FilterBar />
        <section className="product-header ">
          <form className="mt-5 d-flex flex-wrap justify-content-lg-between justify-content-md-center justify-content-xs-center align-items-baseline gap-3">
            <label className="d-flex justify-content-start col-lg-5 col-md-4 col-sm-12 col-xs-12">
              <input
                value={searchBy}
                onChange={handleSearchInputChange || ''}
                className="form-control rounded-0"
                id="products__searching"
                type="text"
                placeholder="Search..."
              />
              <Button variant="dark" className="rounded-0" type="submit">
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
                <option value="name">Name</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="rating">Rating</option>
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