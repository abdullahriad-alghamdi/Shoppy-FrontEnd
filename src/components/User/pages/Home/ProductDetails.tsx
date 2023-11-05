import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { Product, fetchProducts, findProductById } from '../../../../redux/slices/Products/productSlice'
import { AppDispatch, RootState } from '../../../../redux/store'
import { addToCart } from '../../../../redux/slices/Cart/cartSlice'

import { Card, Container, Row, Spinner } from 'react-bootstrap'
import { ButtonGroup } from '@mui/material'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()
  const { singleProduct, isLoading, error } = useSelector((state: RootState) => state.products)
  const { categories } = useSelector((state: RootState) => state.categories)

  useEffect(() => {
    dispatch(fetchProducts()).then(() => dispatch(findProductById(Number(id))))
  }, [id])

  // Returns the name of the category with the given ID.
  const getCategoryNameById = (categoryId: number) => {
    const category = categories.find((category) => category.id === categoryId)
    return category ? category.name : 'Category not found'
  }
  if (isLoading) {
    return (
      <h2 className="loading">
        <Spinner animation="border" variant="light" />
      </h2>
    )
  }
  if (error) {
    return <h2 className="loading">{error}</h2>
  }

  const handelAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }

  return (
    <section className="d-flex m-5 flex-column flex-wrap">
      <ButtonGroup className="p-2 col-12">
        <button className="btn btn-dark" onClick={() => navigate(-1)}>
          Back
        </button>
      </ButtonGroup>

      <Container>
        <Row className="d-flex justify-content-center align-items-center col-12">
          <div style={{ maxWidth: '800px', maxHeight: '800px' }}>
            <Card.Img
              variant="top"
              src={singleProduct.image}
              className="col-sm-12 col-md-3 col-lg-3"
            />
          </div>

          <Card.Body className="col-sm-12 col-md-3 col-lg-3">
            <Card.Title className="fs-1">{singleProduct.name}</Card.Title>
            <Card.Text className="text-muted mt-4">{singleProduct.description}</Card.Text>
            <Card.Text>
              <span className="fw-bold">Price: </span>
              {singleProduct.price ? singleProduct.price : 'Price not found'}
              <span className="text-muted fw-bold"> SAR</span>
            </Card.Text>
            <Card.Text>
              <span className="fw-bold">Category: </span>
              {singleProduct.categories
                ? singleProduct.categories
                  .map((categoryId) => getCategoryNameById(categoryId))
                  .join(', ')
                : 'Product not assigned to any category'}
            </Card.Text>
            <Card.Text>
              <span className="fw-bold">variants: </span>
              {singleProduct.variants
                ? singleProduct.variants.map((variant) => (
                  <span key={variant} className="me-2">
                    {variant}
                  </span>
                ))
                : 'No variants provided'}
            </Card.Text>
            <Card.Text>
              {' '}
              <span className="fw-bold">Sizes: </span>
              {singleProduct.sizes && singleProduct.sizes.length > 0
                ? singleProduct.sizes.map((size) => (
                  <span className="me-2" key={size}>
                    {size}
                  </span>
                ))
                : 'No sizes provided'}
            </Card.Text>
            <Card.Text>
              <button
                className="btn"
                onClick={() => {
                  handelAddToCart(singleProduct)
                }}
                style={{
                  marginLeft: '0px',
                  backgroundColor: '#F5C419',
                  fontWeight: 'bold',
                  borderRadius: '0px'
                }}>
                Add to cart
              </button>
            </Card.Text>
          </Card.Body>
        </Row>
      </Container>
    </section>
  )
}

export default ProductDetails
