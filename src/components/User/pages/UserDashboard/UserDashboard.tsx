import { useSelector } from "react-redux"
import UserSideBar from "./UserSideBar"
import { RootState } from "../../../../redux/store"



const UserDashboard = () => {
  const random = Math.floor(Math.random() * 2000)

  const { isLogin, userData } = useSelector((state: RootState) => state.users)
  const { users } = useSelector((state: RootState) => state.users)

  const userName = () => {
    if (isLogin && userData?.role === 'visitor') {
      // finding the firstName of the admin who is logged in and assigning it to the visitor variable
      const visitor = users.find((user) => user.role === 'visitor' && user.id === userData.id)
      const visitorName = visitor?.firstName + ' ' + visitor?.lastName
      return visitorName
    }
  }

  return <>
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
        <h1 className="text-white fw-bold p-5">{`Welcome ${userName()}!`}</h1>
      </section>
      <UserSideBar />
    </section>
  </>
}


export default UserDashboard
