import AdminSideBar from './AdminSideBar'

const random = Math.floor(Math.random() * 200000)
const AdminDashboard = () => {
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
          <h1 className="text-white p-5">Welcome Abdullah!</h1>
        </section>
        <AdminSideBar />
      </section>
    </>
  )
}

export default AdminDashboard
