import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

import UserDashboard from './UserDashboard'
import { baseURl } from '../../redux/slices/usersList/userSlice'

const OrdersHistory = () => {
  const { userData } = useSelector((state: RootState) => state.users)
  const { orders } = useSelector((state: RootState) => state.orders)
  const { products } = useSelector((state: RootState) => state.products)

  return (
    <>
      <UserDashboard />
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center mt-5">Orders History</h1>
              <table className="table table-bordered table-hover border text-center my-5 table-responsive align-middle">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">purchased At</th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders.map((order) => {
                      return (
                        userData &&
                        userData._id === order._id && (
                          <tr key={order._id}>
                            {products &&
                              products.map((product) => {
                                return (
                                  order.products
                                    .map((product) => product.product._id)
                                    .includes(product._id) && (
                                    <td
                                      key={product._id}
                                      className="d-flex flex-column justify-content-center align-items-center">
                                      <img
                                        src={product.image}
                                        alt={product.title}
                                        className="img-fluid"
                                        width="100px"
                                        height="100px"
                                      />
                                      <p>{product.title}</p>
                                    </td>
                                  )
                                )
                              })}

                            <td>{order.status}</td>
                          </tr>
                        )
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrdersHistory
