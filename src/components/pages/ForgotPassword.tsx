import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../redux/store'

import { forgotPassword } from '../../redux/slices/usersList/userSlice'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(forgotPassword(email))
    navigate('/login')
  }

  return (
    <>
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
        {/* forgot password form */}
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
            style={{
              color: '#007f7f',
              fontSize: '28px',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
            Reset Password Form
          </h1>
          <p style={{ fontSize: '16px', marginBottom: '20px' }}>
            Keep an eye on your email inbox 👀
          </p>
          <input
            type="email"
            placeholder="example@gmail.com"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
            value={email}
            onChange={handleEmailChange}
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
            Reset Password
          </button>
          <p style={{ fontSize: '14px', color: '#888' }}>
            A reset link will be sent to your email soon!
          </p>
        </form>
      </div>
    </>
  )
}

export default ForgotPassword
