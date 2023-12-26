import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

import AdminSideBar from '../../components/admin/AdminSideBar'

function Orders() {
  const { orders } = useSelector((state: RootState) => state.orders)
  const { products } = useSelector((state: RootState) => state.products)

  return (
    <>
      <section>
        <AdminSideBar />
        <section>
          {orders.length > 0 ? (
            <table
              border={1}
              className="table table-striped table-hover table-bordered border-dark mx-auto w-75 align-middle text-center">
              <thead className="table-dark text-center">
                <tr className="text-center align-middle">
                  <th>Order ID</th>
                  <th colSpan={2} style={{ width: '20%' }}>
                    Products
                  </th>
                  <th>Amount</th>
                  <th>Shipping Address</th>
                  <th>City</th>
                  <th>Postal Code</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td colSpan={2}>
                      {order.products.map((product, id) => (
                        <p key={id} className="text-middle  border border-dark">
                          {products.map((product) => (
                            <p key={product._id}>{product.title + ' '}</p>
                          ))}
                        </p>
                      ))}
                    </td>
                    <td>{order.payment.amount}</td>
                    <td>{order.shipping.address}</td>
                    <td>{order.shipping.city}</td>
                    <td>{order.shipping.postalCode}</td>
                    <td>{order.shipping.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            'No orders found'
          )}
        </section>
      </section>
    </>
  )
}

export default Orders
