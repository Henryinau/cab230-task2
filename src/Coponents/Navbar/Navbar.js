import React from "react";

import "./Navbar.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyNavbar()
{
    return(
       
        <Navbar bg="dark" variant="dark">
            
        <Container>
        <Navbar.Brand href="#home">Henry's web</Navbar.Brand>
        
          <Nav className="me-auto">
          <Nav.Link href="/">home</Nav.Link>
          <Nav.Link href="/movie">Movie</Nav.Link>
          <Nav.Link href="/signup">Register</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
          
          </Nav>
        </Container>
      </Navbar>
      
    )
}