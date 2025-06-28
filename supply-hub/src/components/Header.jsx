import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

export default function Header({user, setUser}) {
  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem('user');
    setUser(prev => ({}));
    navigate('/');
  }

  return (
    <nav>
        <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">Supply-Hub</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/offers">Offers</Nav.Link>
                {user.role === 'supplier'? (<Nav.Link href="/myoffers">MyOffers</Nav.Link>):('')}
                <Nav.Link href="/profile">Profile({user.username ? (user.username):('')})</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </nav>
  )
}
