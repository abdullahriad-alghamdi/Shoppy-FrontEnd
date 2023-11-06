import { useDispatch, useSelector } from 'react-redux'

import EmptyCart from './EmptyCart'
import { RootState } from '../../../../redux/store'
import { Product } from '../../../../redux/slices/products/productSlice'
import { DecreaseQuantity, increaseQuantity, removeFromCart } from '../../../../redux/slices/Cart/cartSlice'

import { Button } from 'react-bootstrap'
import { FaRegTrashAlt, FaShoppingBag } from 'react-icons/fa'

const Cart = () => {
  const { inCart, totalPrice } = useSelector((state: RootState) => state.cart)

  const dispatch = useDispatch()
  const onIncrease = (product: Product) => {
    dispatch(increaseQuantity(product))
  }

  const onDecrease = (product: Product) => {
    dispatch(DecreaseQuantity(product))
  }
  const onRemove = (product: Product) => {
    dispatch(removeFromCart(Number(product.id)))
  }
  if (inCart.length == 0) {
    return <EmptyCart />
  }

  return (
    <>
      <h1 className='mt-5 d-flex justify-content-center align-items-center'><FaShoppingBag className='me-3' /><span>My cart</span></h1>
      <hr className='w-50 mx-auto mb-5' />
      <section className='row justify-content-center mb-5 gap-5 mx-2'>

        <section className='col-xxl-5 col-xl-7 col-lg-7'>
          {inCart.map((product) => (
            <div key={product.id} className='d-flex flex-row align-items-center border-top p-3 gap-3'>

              <img src={product.image} alt={product.name} className='img-fluid' width='150px' height="150px" />
              <div className='d-flex flex-row justify-content-between align-items-start w-100'>
                <div className='d-flex flex-column'>
                  <p className='fs-5 fw-bold'>{product.name}</p>
                  <p>{product.description.slice(0, 30)}...</p>
                  <p className='outline-primary'>{product.price} <span className='text-muted fw-bold'>SAR</span></p>
                </div>

                <div className='d-flex flex-column gap-5 align-items-center'>
                  <div className="d-flex border rounded-pill">
                    <button
                      onClick={() => onDecrease(product)}
                      className="btn">
                      <span className='fs-5 fw-bold'>-</span>
                    </button>
                    <input type="text" value={product.quantity} className="text-center border-0" style={{ width: '25px' }} />
                    <button
                      onClick={() => onIncrease(product)}
                      className="btn">
                      <span className='fs-5 fw-bold'>+</span>
                    </button>
                  </div>

                  <p
                    onClick={() => onRemove(product)}
                    className="">
                    <span className='fs-5'><FaRegTrashAlt className='trash-icon' /></span>
                  </p>
                </div>

              </div>


            </div>
          ))}
        </section >

        <section className='d-flex flex-column justify-content-start col-xxl-3 col-lg-8'>
          <div className="p-4 bg-white m-3">
            <input type="text" placeholder="Enter coupon code" className="p-2 border w-75" readOnly />
            <button className="bg-dark w-25 p-2 text-white">Apply</button>
            <hr />
            <section className='d-flex flex-row justify-content-between p-2'>
              <div className=" d-flex flex-column justify-content-between p-2 gap-2">
                <span className="">Sup-Total</span>
                <span className="">Tax 15%</span>
                <span className="">Discount</span>
                <span className="">Delivery</span>
              </div>

              <div className="d-flex flex-column justify-content-between align-items-end p-2">
                <span className="">${totalPrice}</span>
                <span className="">$0</span>
                <span className="">-$0</span>
                <span className="">Free</span>
              </div>
            </section>
            <hr />
            <div className='d-flex flex-row justify-content-between px-3'>
              <span className="fw-bold">Total</span>
              <span className="">${totalPrice}</span>
            </div>

            <center>
              <Button variant='btn border-dark border' className="mt-4 fw-bold w-100 bg-light text-dark
            ">Checkout</Button>
            </center>
          </div>
        </section>

      </section>
    </>
  )

}

export default Cart
