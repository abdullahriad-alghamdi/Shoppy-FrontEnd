import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/store'

import UserDashboard from './UserDashboard'

import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { editInfo } from '../../../../redux/slices/usersList/userSlice'

const UserProfileEdit = () => {
  const { userData } = useSelector((state: RootState) => state.users)

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    id: userData?._id
  })

  const dispatch: AppDispatch = useDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevState) => {
      return { ...prevState, [name]: value }
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(editInfo(user))
    toast.success('Profile updated successfully', {
      position: 'top-center',
      autoClose: 2000
    })

    setUser({
      name: '',
      email: '',
      password: '',
      id: userData?._id
    })
  }

  return (
    <>
      <UserDashboard />
      <Form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center bg-dark text-white p-3">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={user.name} name="name" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" value={user.email} name="email" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={user.password}
            name="password"
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit" variant="outline-light">
          Apply
        </Button>
      </Form>
    </>
  )
}

export default UserProfileEdit
