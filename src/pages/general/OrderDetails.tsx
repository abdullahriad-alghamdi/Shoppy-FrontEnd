import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'

import { ButtonGroup } from '@mui/material'
import { Card, Row } from 'react-bootstrap'
import { singleOrder } from '../../redux/slices/orders/orderSlice'

const OrderDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()
  const { orderDetails } = useSelector((state: RootState) => state.orders)

  useEffect(() => {
    dispatch(singleOrder(String(id)))
  }, [dispatch, id])

  return (
    <section className="d-flex m-5 flex-column flex-wrap">
      <ButtonGroup className="p-2 col-12">
        <button className="btn btn-dark" onClick={() => navigate(-1)}>
          Back
        </button>
      </ButtonGroup>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: 'auto'
        }}>
        <Card.Body className="col-12">
          {orderDetails && (
            <>
              <Card.Title className="fs-1 my-5">Order Details</Card.Title>
              <Card.Text>
                <span className="fw-bold">Order ID:</span> {orderDetails._id}
              </Card.Text>
              <Card.Text>
                <span className="fw-bold">Order Status:</span> {orderDetails.status}
              </Card.Text>
              <Card.Text>
                <span className="fw-bold">Order User:</span>{' '}
                {orderDetails.buyer && orderDetails.buyer.name}
              </Card.Text>
              <Card.Text>
                <span className="fw-bold">Order Amount:</span>{' '}
                {orderDetails.payment && orderDetails.payment.amount}
              </Card.Text>

              <Card.Title className="fs-1 my-5">Shipping Details</Card.Title>
              <Card.Text>
                <span className="fw-bold">Address:</span>{' '}
                {orderDetails.shipping && orderDetails.shipping.address}
              </Card.Text>
              <Card.Text>
                <span className="fw-bold">City:</span>{' '}
                {orderDetails.shipping && orderDetails.shipping.city}
              </Card.Text>
              <Card.Text>
                <span className="fw-bold">Postal Code:</span>{' '}
                {orderDetails.shipping && orderDetails.shipping.postalCode}
              </Card.Text>
              <Card.Text>
                <span className="fw-bold">Country:</span>{' '}
                {orderDetails.shipping && orderDetails.shipping.country}
              </Card.Text>

              <table
                border={1}
                className="table table-striped my-5 table-hover table-bordered border-dark text-center orders-Detail align-middle">
                <thead className="table-dark text-center">
                  <tr className="text-center align-middle">
                    <th>Product Image</th>
                    <th>Product ID</th>
                    <th>Product Title</th>
                    <th>Product Price</th>
                    <th>Product Quantity</th>
                    <th>Product Count In Stock</th>
                  </tr>
                </thead>

                {orderDetails.products &&
                  orderDetails.products.map((product) => (
                    <tbody key={product.product._id}>
                      <tr>
                        <td>
                          <img
                            src={(product.product.image && product.product.image) || ''}
                            alt={product.product.title}
                            className="img-fluid"
                            width="150px"
                            height="150px"
                          />
                        </td>
                        <td>{product.product._id}</td>
                        <td>{product.product.title}</td>
                        <td>{product.product.price}</td>
                        <td>{product.product.quantity}</td>
                        <td>{product.product.countInStock}</td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            </>
          )}
        </Card.Body>
      </Row>
    </section>
  )
}

export default OrderDetails
