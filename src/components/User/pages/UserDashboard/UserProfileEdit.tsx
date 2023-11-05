import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../redux/store"

import UserDashboard from "./UserDashboard"

import { editInfo } from "../../../../redux/slices/UsersList/userSlice"
import { Button, Form } from "react-bootstrap"

const UserProfileEdit = () => {

  const { userData } = useSelector((state: RootState) => state.users)

  const dispatch: AppDispatch = useDispatch()

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'visitor',
    id: userData?.id
  })


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevState) => {
      return { ...prevState, [name]: value }
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(editInfo(user))
  }

  return <>
    <UserDashboard />
    <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center bg-dark text-white p-3">


      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder={userData?.firstName}
          value={user.firstName}
          name="firstName"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder={userData?.lastName}
          value={user.lastName}
          name="lastName"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder={userData?.email}
          value={user.email}
          name="email"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder={userData?.password}
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
}

export default UserProfileEdit
