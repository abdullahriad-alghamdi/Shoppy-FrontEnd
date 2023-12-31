import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDispatch } from '../../../redux/store'

import { resetPassword } from '../../../redux/slices/usersList/userSlice'

const ResetPassword = () => {
  const { token } = useParams()

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const [password, setPassword] = useState('')

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(resetPassword({ token: token!, newPassword: password }))
    navigate('/login')
  }

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        backgroundColor: '#f0f9f0',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <form
        style={{
          maxWidth: '400px',
          padding: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}
        onSubmit={handleSubmit}>
        <h1
          style={{ color: '#007f7f', fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>
          Reset Your Password
        </h1>
        <p style={{ fontSize: '16px', marginBottom: '30px' }}>Enter your new password below.</p>
        <input
          type="password"
          placeholder="Enter new password"
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            boxSizing: 'border-box'
          }}
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007f7f',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
