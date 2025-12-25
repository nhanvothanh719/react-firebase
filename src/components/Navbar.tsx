import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const HeaderNavbar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link>
            <NavLink to="/books">Books</NavLink>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default HeaderNavbar
