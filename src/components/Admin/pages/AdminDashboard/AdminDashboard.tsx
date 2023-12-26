import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'

import AdminSideBar from './AdminSideBar'

const AdminDashboard = () => {
  const random = Math.floor(Math.random() * 2000)

  const { isLogin, userData } = useSelector((state: RootState) => state.users)
  const { users } = useSelector((state: RootState) => state.users)

  // function to find the name of the admin who is logged in
  const adminName = () => {
    if (isLogin && userData?.isAdmin) {
      // finding Name of the admin who is logged in and assigning it to the admin variable
      const admin = users.find((user) => user.isAdmin && user._id === userData._id)
      return admin?.name
    }
  }
  return (
    <>
      <section>
        <section className="d-flex flex-column align-items-center bg-dark">
          <img
            src={`https://avatars.githubusercontent.com/u/${random}?v=4`}
            alt=""
            style={{
              margin: '1rem',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: '1px solid black'
            }}
            className="img-fluid"
          />
          <h1 className="text-white p-5">{`Welcome ${adminName()}!`}</h1>
        </section>
        <AdminSideBar />
      </section>
    </>
  )
}

export default AdminDashboard
