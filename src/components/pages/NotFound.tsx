import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="loading d-flex flex-column justify-content-center align-items-center">
        <h1>404 Page not found</h1>
        <button className="btn btn-primary m-4" onClick={() => navigate('/')}>
          Go back to Home
        </button>
      </div>
    </>
  )
}

export default NotFound
