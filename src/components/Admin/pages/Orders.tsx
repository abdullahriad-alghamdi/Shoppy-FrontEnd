import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'

import AdminSideBar from './AdminSideBar'
import { fetchOrders } from '../../../redux/slices/Orders/orderSlice'

function Orders() {
  const dispatch: AppDispatch = useDispatch()
  const { orders, isLoading, error } = useSelector((state: RootState) => state.Orders)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [])

  if (error) {
    return <h3> {error} </h3>
  }

  return (
    <>
      <section className="admin-dashboard">
        <AdminSideBar />
        <section className="admin-dashboard-content">
          {!error && isLoading ? (
            <h3> Loading orders...</h3>
          ) : orders.length > 0 ? (
            <table
              border={1}
              className="table table-striped table-hover table-bordered border-dark mx-auto w-75">
              <thead className="table-dark text-center">
                <tr>
                  <th>Order id</th>
                  <th>Product id</th>
                  <th>Buyer id</th>
                  <th>purchased Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.productId}</td>
                    <td>{order.userId}</td>
                    <td>{order.purchasedAt}</td>
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
