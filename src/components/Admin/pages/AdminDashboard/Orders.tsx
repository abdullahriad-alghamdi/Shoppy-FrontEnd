import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'

import AdminSideBar from './AdminSideBar'

function Orders() {
  const { orders, isLoading, error } = useSelector((state: RootState) => state.orders)
  const { users } = useSelector((state: RootState) => state.users)
  const { products } = useSelector((state: RootState) => state.products)


  if (error) {
    return <h3> {error} </h3>
  }

  return (
    <>
      <section>
        <AdminSideBar />
        <section>
          {!error && isLoading ? (
            <h3> Loading orders...</h3>
          ) : orders.length > 0 ? (
            <table
              border={1}
              className="table table-striped table-hover table-bordered border-dark mx-auto w-75 align-middle text-center" >
              <thead className="table-dark text-center">
                <tr className="text-center align-middle">
                  <th>Id</th>
                  <th>Product</th>
                  <th>Buyer</th>
                  <th>Purchased Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>

                    <td>{products.find((product) => product.id === order.productId)?.name}</td>
                    <td>{users.find((user) => user.id === order.userId)?.firstName}</td>
                    <td>{order.purchasedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            'No orders found'
          )}
        </section>
      </section >
    </>
  )
}

export default Orders
