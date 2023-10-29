import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import {
  Product,
  fetchProducts,
  searchProducts,
  sortProducts
} from '../../../redux/slices/products/productSlice'

import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Rating from '@mui/material/Rating'

import Hero from '../Hero'
import Sidebar from '../Sidebar'

function Home() {
  const dispatch: AppDispatch = useDispatch()
  const { products, isLoading, error, searchBy } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

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
      <Hero />
      <main>
        <section className="product-header">
          <div></div>
          <label htmlFor="products__searching" className="search-container">
            <input
              value={searchBy}
              onChange={handleSearchInputChange || ''}
              className="search-input"
              id="products__searching"
              type="text"
              placeholder="Search..."
            />
            <button className="search-button">Search</button>
          </label>
          <label htmlFor="sorting" className="sort-container">
            Sort by:
            <select
              className="products__sorting"
              id="products__sorting"
              onChange={handleSortChange}>
              <option value="price">Price</option>
              <option value="name">Name</option>
            </select>
          </label>
        </section>
        <section className="products-container">
          <Sidebar />
          <div className="products">
            <div className="product">
              {!error && isLoading ? (
                <h3> Loading products...</h3>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <section key={product.id} className="product-items">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-info">
                      <span className="product-title">{product.name} </span>
                      <Rating name="read-only" value={Number(product.rating)} readOnly />
                      <span className="product-price">
                        <b>Price:</b>
                        {` ${product.price} €`}
                      </span>
                      <br />
                    </div>
                    <button className="product-button">Add to cart</button>
                  </section>
                ))
              ) : (
                'No products found'
              )}
            </div>
            <Stack spacing={2} sx={{ marginTop: 4 }}>
              <Pagination count={10} />
            </Stack>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home
