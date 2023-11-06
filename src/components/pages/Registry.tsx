import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { User, register } from '../../redux/slices/usersList/userSlice'
import { toast } from 'react-toastify'



const Registry = () => {

  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const { users } = useSelector((state: RootState) => state.users)

  const [user, setUser] = useState<User>({
    id: users.length + 1,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    role: 'visitor'
  })

  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevState) => {
      return { ...prevState, [name]: value }
    })

  }



  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const foundUser = users.find(
      (userData) => userData.email.toLocaleLowerCase() === user.email.toLocaleLowerCase()
    )
    if (foundUser) {
      setErrorMessage('User already exists')
    } else if (user.password.length < 8) {
      alert('Password must be at least 8 characters long')
      return
    } else if (user.password !== user.passwordConfirmation) {
      setErrorMessage('Passwords do not match')
    } else if (!user.email || !user.password) {
      alert('Both fields are required')
      return
    } else {
      dispatch(register(user))
      navigate('/login')
      toast.promise(Promise.resolve(), {
        pending: 'Logging in...',
        success: 'Logged in successfully',
        error: 'Error logging in'
      })
    }
  }



  return (
    <>
      <section className="login-registry-container" >
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" name="firstName" value={user.firstName} required onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" name="lastName" value={user.lastName} required onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} required onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={user.password} required onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPasswordConfirmation">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password" placeholder="Password" name="passwordConfirmation" value={user.passwordConfirmation} required onChange={handleChange} />
          </Form.Group>


          <Button className="mt-3" variant="dark" type="submit">
            Sign Up
          </Button>
          <p className='text-danger m-5 '>{errorMessage}</p>

        </Form>
      </section>
    </>
  )
}

export default Registry
