import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Header() {
  return (
    <nav>
        <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">Supply-Hub</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/user">Home</Nav.Link>
                <Nav.Link href="/offers">Offers</Nav.Link>
                <Nav.Link href="/myoffers">MyOffers</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
                {/* <NavDropdown title="Movie Details" id="basic-nav-dropdown">
                    <NavDropdown.Item href={`/moviedetails/${"AAA"}`}>{"AAA"}</NavDropdown.Item>
                    <NavDropdown.Item href={`/moviedetails/${"AAA"}`}>{"AAA"}</NavDropdown.Item>
                </NavDropdown> */}
                <span></span>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </nav>
  )
}
