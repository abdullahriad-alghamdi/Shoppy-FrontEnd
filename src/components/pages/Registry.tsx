import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { registerUser } from '../../redux/slices/usersList/userSlice'

const Registry = () => {
  const { users } = useSelector((state: RootState) => state.users)
  const dispatch: AppDispatch = useDispatch()

  type User = {
    name: string
    username: string
    email: string
    password: string
    address: string
    phone: string
    image: string
  }
  const [user, setUser] = useState<User>({
    name: '',
    username: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    image: ''
  })

  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement
      const file = fileInput.files?.[0]
      setUser((prev) => ({ ...prev, [name]: file }))
    } else {
      setUser((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    // formData an object that allows us to send files and text
    const formData = new FormData()
    for (const key in user) {
      formData.append(key, user[key as keyof User])
    }
    const foundUser = users.find(
      (userData) => userData.email === user.email || userData.username === user.username
    )
    try {
      if (foundUser) {
        setErrorMessage('User already exists')
      } else if (user.password.length < 8) {
        alert('Password must be at least 8 characters long')
        return
      } else if (!user.email || !user.password) {
        alert('Both fields are required')
        return
      } else {
        const response = dispatch(registerUser(formData))
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <section className="login-registry-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={user.name}
              required
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter user name"
              name="username"
              value={user.username}
              required
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              name="email"
              value={user.email}
              required
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              value={user.password}
              required
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter address"
              name="address"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formImage">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" name="image" accept="image/*" onChange={handleChange} />
          </Form.Group>

          <Button className="w-100" variant="dark" type="submit">
            Sign Up
          </Button>

          <p className="text-danger m-5 ">{errorMessage}</p>
        </Form>
      </section>
    </>
  )
}

export default Registry
