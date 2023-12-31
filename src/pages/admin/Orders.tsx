import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

import AdminSideBar from '../../components/admin/AdminSideBar'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

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
              className="table table-striped table-hover table-bordered border-dark mx-auto w-75 align-middle text-center orders-table">
              <thead className="table-dark text-center">
                <tr className="text-center align-middle">
                  <th>Order ID</th>
                  <th>Products</th>
                  <th>Buyer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>
                      <Link to={`/dashboard/admin/order/details/${order._id}`}>
                        <Button variant="dark">View</Button>
                      </Link>
                    </td>
                    <td>{order.buyer.name}</td>
                    <td>{order.payment.amount}</td>
                    <td>{order.status}</td>
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
