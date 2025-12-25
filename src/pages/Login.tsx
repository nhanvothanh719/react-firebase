import { Button, Form } from 'react-bootstrap'
import { useFirebase } from '../hooks/useFirebase'
import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const firebase = useFirebase()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate('/')
    }
  }, [firebase, navigate])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setIsLoading(true)
      await firebase.loginWithEmail(email, password)
      alert('Login successfully')
      resetForm()
    } catch (error) {
      console.error('>>> Fail to login: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
  }

  const loginWithGoogle = async () => {
    try {
      await firebase.loginWithGoogle()
    } catch (error) {
      console.error('>>> Fail to login with Google: ', error)
    }
  }

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <div>
        <Form className="mb-4" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Login...' : 'Submit'}
          </Button>
        </Form>
        <div>
          <Button variant="success" type="button" onClick={loginWithGoogle}>
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
