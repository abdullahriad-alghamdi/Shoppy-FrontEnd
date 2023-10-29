import AdminSideBar from './AdminSideBar'

const AdminDashboard = () => {
  return (
    <>
      <section className="admin-dashboard">
        <AdminSideBar />
        <main className="mainContent">
          <h2>Admin Dashboard content</h2>
        </main>
      </section>
    </>
  )
}

export default AdminDashboard
