import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'

import { addToCart } from '../../redux/slices/cart/cartSlice'
import { Product, findProductById } from '../../redux/slices/products/productSlice'

import { ButtonGroup } from '@mui/material'
import { Card, Row } from 'react-bootstrap'
import { baseURl } from '../../redux/slices/usersList/userSlice'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()
  const { singleProduct } = useSelector((state: RootState) => state.products)
  const { isLogin, userData } = useSelector((state: RootState) => state.users)

  useEffect(() => {
    dispatch(findProductById(String(id)))
  }, [dispatch, id])

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

      <Row className="d-flex justify-content-space-around align-items-center col-9 m-auto">
        <div
          className="img-fluid col-sm-12 col-md-6 col-lg-6"
          style={{
            height: '500px',

            marginLeft: 'auto',
            marginRight: '100px',
            marginBottom: '30px'
          }}>
          <img
            src={(singleProduct.image && singleProduct.image) || ''}
            alt={singleProduct.title}
            className="img-fluid col-12"
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        <Card.Body className="col-sm-12 col-md-3 col-lg-3">
          <Card.Title className="fs-1">{singleProduct.title}</Card.Title>
          <Card.Text className="text-muted mt-4">{singleProduct.description}</Card.Text>
          <Card.Text>
            <span className="fw-bold">Price: </span>
            {singleProduct.price ? singleProduct.price : 'Price not found'}
            <span className="text-muted fw-bold"> SAR</span>
          </Card.Text>
          <Card.Text>
            <span className="fw-bold">CountInStock: </span>
            {singleProduct.countInStock ? singleProduct.countInStock : 'CountInStock not found'}
          </Card.Text>
          <Card.Text>
            <span className="fw-bold">Category: </span>
            {singleProduct.category ? singleProduct.category.title : 'Category not found'}
          </Card.Text>
          <Card.Text>
            <span className="fw-bold">Quantity: </span>
            {singleProduct.quantity ? singleProduct.quantity : 'Quantity not found'}
          </Card.Text>
          <Card.Text>
            {!userData?.isAdmin && (
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
            )}
          </Card.Text>
        </Card.Body>
      </Row>
    </section>
  )
}

export default ProductDetails
