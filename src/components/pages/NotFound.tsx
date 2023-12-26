import { useNavigate } from 'react-router-dom'

import { Button } from 'react-bootstrap'
import { FaArrowLeft } from 'react-icons/fa'
import { toast } from 'react-toastify'

const NotFound = () => {
  const navigate = useNavigate()

  // counter function counts 10 s and print the number of seconds left
  const counter = () => {
    let seconds = 10
    const interval = setInterval(() => {
      seconds--
      if (seconds === 0) {
        clearInterval(interval)
        navigate('/')
      }
    }, 1000)
    toast.info(`You will be redirected to the home page in ${seconds} seconds`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true
    })
  }

  counter()

  return (
    <>
      <section className="overlay bg-light">
        <div className="error-container">
          <img src="/assets/error.png" alt="404" className="img-fluid error-img" />
          <div className="d-flex flex-column align-items-center">
            <h1 className="font-brandon"> AWWW...DON’T CRY. 🥺</h1>

            <p className="font-dosis">
              {' '}
              <center>It's just a 404 Error! </center>
              <br />
              What you’re looking for may have been misplaced in Long Term Memory.
            </p>
            <Button
              variant="outline-secondary border-dark btn-lg;"
              className="m-4"
              onClick={() => navigate(-1)}>
              <FaArrowLeft className="mx-2" /> Go Back
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default NotFound
