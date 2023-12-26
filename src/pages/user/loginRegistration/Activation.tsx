import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDispatch } from '../../../redux/store'

import { activateUser } from '../../../redux/slices/usersList/userSlice'

import jwtDecode from 'jwt-decode'

const Activation = () => {
  const { token } = useParams<{ token: string }>()
  const decoded = token && jwtDecode(token)

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleActivation = (token: string) => {
    try {
      dispatch(activateUser(token))
      navigate('/login')
    } catch (error: any) {
      console.log(error.response.data.errors)
    }
  }

  return (
    <>
      <div
        style={{
          fontFamily: 'Arial, sans-serif',
          margin: 0,
          padding: 0,
          textAlign: 'center',
          backgroundColor: '#f0f9f0'
        }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}>
          <div
            style={{
              maxWidth: '400px',
              padding: '20px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}>
            <h1
              style={{
                color: '#007f7f',
                fontSize: '28px',
                fontWeight: 'bold',
                marginBottom: '20px'
              }}>
              Hello, {(decoded as { name: string })?.name} !
            </h1>
            <p style={{ fontSize: '16px', marginBottom: '30px' }}>
              We received a request to activate your account.
            </p>
            <p style={{ fontSize: '16px', marginBottom: '30px' }}>
              To activate your account, please click the button below.
            </p>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#007f7f',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
              onClick={() => token && handleActivation(token)}>
              Activate
            </button>
            <p style={{ fontSize: '14px', color: '#888', marginTop: '20px' }}>
              Note: Activation link is valid for a limited time.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Activation
