import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import { editInfo, fetchUsers } from '../../redux/slices/usersList/userSlice'
import AdminDashboard from './AdminDashboard'

import { Button, Form } from 'react-bootstrap'

const AdminProfileEdit = () => {
  const { userData } = useSelector((state: RootState) => state.users)

  const [user, setUser] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    password: ''
  })

  const dispatch: AppDispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement
      const file = fileInput.files?.[0]
      setUser((prev) => ({ ...prev, [name]: file }))
    } else {
      setUser((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData()

    formData.append('name', user.name)
    formData.append('email', user.email)
    formData.append('password', user.password)

    if (userData) {
      const { _id } = userData
      const data = { _id, formData }
      dispatch(editInfo(data)).then(() => {
        dispatch(fetchUsers())
      })
    }

    setUser(user)
  }

  return (
    <>
      <AdminDashboard />
      <Form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center bg-dark text-white p-3">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={user?.name}
            value={user?.name}
            name="name"
            onChange={handleChange}
            autoComplete="off"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder={user?.email}
            value={user?.email}
            name="email"
            onChange={handleChange}
            autoComplete="off"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder={user?.password}
            value={user?.password}
            name="password"
            onChange={handleChange}
            autoComplete="off"
          />
        </Form.Group>

        <Button type="submit" variant="outline-light">
          Apply
        </Button>
      </Form>
    </>
  )
}

export default AdminProfileEdit
