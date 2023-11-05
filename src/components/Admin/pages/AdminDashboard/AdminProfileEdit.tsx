import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/store'

import { editInfoAdmin } from '../../../../redux/slices/UsersList/userSlice'
import AdminDashboard from './AdminDashboard'

import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

const AdminProfileEdit = () => {
  const { userData } = useSelector((state: RootState) => state.users)

  const [user, setUser] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName,
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
    if (userData) {
      const { id } = userData
      const data = { id, ...user }
      dispatch(editInfoAdmin(data))
      toast.success('Profile updated successfully', {
        position: 'top-center',
        autoClose: 2000,
      })
    }

    setUser({
      firstName: '',
      lastName: '',
    })
  }

  return (
    <>
      <AdminDashboard />
      <Form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center bg-dark text-white p-3">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={user?.firstName}
            value={user?.firstName}
            name="firstName"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={user?.lastName}
            value={user?.lastName}
            name="lastName"
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

export default AdminProfileEdit
