import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchProducts, findProductById } from '../../../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../../../redux/store'
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

  return (
    <section className="d-flex flex-column m-5 flex-wrap">
      <ButtonGroup className="p-2">
        <button className="btn btn-dark" onClick={() => navigate(-1)}>
          Back
        </button>
      </ButtonGroup>

      <Container
        className="d-flex flex-row  align-items-center justify-content-center"
        style={{ gap: '10rem', flexWrap: 'wrap' }}>
        <Row className="col-5">
          <Card.Img
            variant="top"
            src={singleProduct.image}
            style={{ minWidth: '300px', minHeight: '300px' }}
          />
        </Row>
        <Row className="col-5">
          <Card.Body>
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
              {singleProduct.sizes
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
                style={{
                  backgroundColor: '#F5C419',
                  fontWeight: 'bold'
                }}>
                Buy now
              </button>
            </Card.Text>
          </Card.Body>
        </Row>
      </Container>
    </section>
  )
}

export default ProductDetails
