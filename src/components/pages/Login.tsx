import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
const Login = () => {
  return (
    <section className="LoginRegistry-Container">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="dark" type="submit">
          Login
        </Button>
      </Form>
    </section>
  )
}

export default Login
