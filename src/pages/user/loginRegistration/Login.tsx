import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../../redux/store'

import { loginUser } from '../../../redux/slices/usersList/userSlice'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const Login = () => {
  const { users } = useSelector((state: RootState) => state.users)
  const [user, setUser] = useState({ email: '', password: '' })

  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevState) => {
      return { ...prevState, [name]: value }
    })
  }

  // useEffect(() => {
  //   navigate(pathName ? pathName : `/dashboard/${userData && userData.isAdmin ? 'admin' : 'user'}`)
  // }, [userData, navigate, pathName])

  // const handleSubmit = async (event: FormEvent) => {
  //   event.preventDefault()

  //   if (user) {
  //     dispatch(loginUser(user))
  //     // this is the line that redirects the user after login based on the role
  //     const foundUser = users.find(
  //       (userData) => userData.email.toLocaleLowerCase() === user.email.toLocaleLowerCase()
  //     )
  //   } else {
  //     alert('please enter valid email and password')
  //   }
  // }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (user) {
      dispatch(loginUser(user))
      const foundUser = users.find(
        (userData) => userData.email.toLocaleLowerCase() === user.email.toLocaleLowerCase()
      )
      if (foundUser?.isAdmin) {
        navigate('/dashboard/admin')
      } else {
        navigate('/')
      }
    } else {
      alert('please enter valid email and password')
    }
  }

  return (
    <section className="login-registry-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={user.email}
            name="email"
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={user.password}
            name="password"
            onChange={handleChange}
            required
            autoComplete="on"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        <Button type="submit" variant="dark">
          Login
        </Button>
        {/* forgot password form */}
        <Form.Group className="mb-3 mt-3" controlId="formBasicCheckbox">
          <Form.Text className="text-muted">
            <Link to="/forgotPassword">Forgot password?</Link>
          </Form.Text>
        </Form.Group>
      </Form>
    </section>
  )
}

export default Login
