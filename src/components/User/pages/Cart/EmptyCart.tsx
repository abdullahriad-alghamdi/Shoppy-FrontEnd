import { Link } from 'react-router-dom'

import { Button } from 'react-bootstrap'

const EmptyCart = () => {
  const images = [
    '/assets/empty-cart-0.png',
    '/assets/empty-cart-1.png',
    '/assets/empty-cart-2.png'
  ]

  const randomImage = images[Math.floor(Math.random() * images.length)]

  return (
    <div className="d-flex justify-content-around py-5 flex-wrap bg-light overlay align-items-center">
      <div className="d-flex flex-column text-center p-5">
        <img
          src={randomImage}
          alt="Empty Cart"
          className="mx-auto mb-4 img-fluid"
          width="300px"
          height="300px"
        />
        <div className="fs-5">
          <p className="text-muted fs-3">Your cart is empty</p>
          <p className="text-muted  font-light">no items added to your cart yet</p>
        </div>

        <Link to="/">
          <Button className="mt-5 shadow-none" variant="outline-primary">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default EmptyCart
