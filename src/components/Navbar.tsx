import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const HeaderNavbar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/books">Books</NavLink>
          <NavLink to="/orders">My orders</NavLink>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default HeaderNavbar
