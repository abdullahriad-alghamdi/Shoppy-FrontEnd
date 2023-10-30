import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const cart = () => {
  // const { cartItems } = useSelector((state: RootState) => state.cart)

  // const cartItems = useSelector((state: RootState) => state.cart.cartItems)
  const { products, error, isLoading } = useSelector((state: RootState) => state.products)
  return (
    <>
      {/* cart container centred with multiple horizontal cards shows small image in the left and the price and quantity in right using react bootstrap  i will show the product slice for now*/}

      <section className=" cart-container d-flex flex-column justify-content-center align-items-center bg-dark h-100">
        <section className="cart-items-container bg-white d-flex flex-column justify-content-center align-items-center m-5 p-5">
          <h1 className="text-center">My Cart</h1>
          {!error && isLoading ? (
            <h3> Loading products...</h3>
          ) : products.length > 0 ? (
            //  display first 3 products
            products.slice(0, 3).map((product) => (
              <Card
                style={{ width: '30rem' }}
                key={product.id}
                className="product-card shadow bg-body rounded d-flex flex-row m-3 ">
                <Card.Img
                  variant="top"
                  src={product.image}
                  className="product-card__image shadow-sm "
                  style={{ width: '5rem', height: '5rem' }}
                />
                <Card.Body className="d-flex justify-content-between bg-dark text-white">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    <b>Price:</b> {product.price}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            'No items added'
          )}
          <Button variant="success" className="w-50 mt-5 fs-5 fw-bold ">
            Proceed to checkout
          </Button>
        </section>
        {/* proceed to checkout button */}
      </section>
    </>
  )
}

export default cart
